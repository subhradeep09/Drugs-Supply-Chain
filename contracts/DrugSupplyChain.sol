// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DrugSupplyChain is AccessControl, Pausable {
    using Counters for Counters.Counter;

    bytes32 public constant HOSPITAL_ROLE = keccak256("HOSPITAL_ROLE");
    bytes32 public constant PHARMACY_ROLE = keccak256("PHARMACY_ROLE");
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");

    Counters.Counter private _requestIds;
    Counters.Counter private _orderIds;

    struct DrugRequest {
        uint256 requestId;
        address hospital;
        string drugName;
        uint256 quantity;
        bool isUrgent;
        string notes;
        RequestStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct DrugOrder {
        uint256 orderId;
        uint256 requestId;
        address vendor;
        string trackingNumber;
        string ipfsReceiptHash;
        OrderStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    enum RequestStatus { PENDING, APPROVED, REJECTED, CANCELLED }
    enum OrderStatus { PENDING, IN_TRANSIT, DELIVERED, CANCELLED }

    mapping(uint256 => DrugRequest) public drugRequests;
    mapping(uint256 => DrugOrder) public drugOrders;
    mapping(address => uint256[]) public hospitalRequests;
    mapping(address => uint256[]) public vendorOrders;

    event RequestCreated(uint256 indexed requestId, address indexed hospital, string drugName, uint256 quantity, bool isUrgent);
    event RequestStatusUpdated(uint256 indexed requestId, RequestStatus status);
    event OrderCreated(uint256 indexed orderId, uint256 indexed requestId, address indexed vendor);
    event OrderStatusUpdated(uint256 indexed orderId, OrderStatus status);
    event DeliveryConfirmed(uint256 indexed orderId, string ipfsReceiptHash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createRequest(
        string memory _drugName,
        uint256 _quantity,
        bool _isUrgent,
        string memory _notes
    ) external whenNotPaused onlyRole(HOSPITAL_ROLE) returns (uint256) {
        _requestIds.increment();
        uint256 requestId = _requestIds.current();

        DrugRequest memory newRequest = DrugRequest({
            requestId: requestId,
            hospital: msg.sender,
            drugName: _drugName,
            quantity: _quantity,
            isUrgent: _isUrgent,
            notes: _notes,
            status: RequestStatus.PENDING,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        drugRequests[requestId] = newRequest;
        hospitalRequests[msg.sender].push(requestId);

        emit RequestCreated(requestId, msg.sender, _drugName, _quantity, _isUrgent);
        return requestId;
    }

    function updateRequestStatus(
        uint256 _requestId,
        RequestStatus _status
    ) external whenNotPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        require(drugRequests[_requestId].requestId != 0, "Request does not exist");
        require(drugRequests[_requestId].status != RequestStatus.CANCELLED, "Request is cancelled");

        drugRequests[_requestId].status = _status;
        drugRequests[_requestId].updatedAt = block.timestamp;

        emit RequestStatusUpdated(_requestId, _status);
    }

    function createOrder(
        uint256 _requestId
    ) external whenNotPaused onlyRole(VENDOR_ROLE) returns (uint256) {
        require(drugRequests[_requestId].requestId != 0, "Request does not exist");
        require(drugRequests[_requestId].status == RequestStatus.APPROVED, "Request not approved");
        require(drugOrders[_requestId].orderId == 0, "Order already exists");

        _orderIds.increment();
        uint256 orderId = _orderIds.current();

        DrugOrder memory newOrder = DrugOrder({
            orderId: orderId,
            requestId: _requestId,
            vendor: msg.sender,
            trackingNumber: "",
            ipfsReceiptHash: "",
            status: OrderStatus.PENDING,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        drugOrders[orderId] = newOrder;
        vendorOrders[msg.sender].push(orderId);

        emit OrderCreated(orderId, _requestId, msg.sender);
        return orderId;
    }

    function updateOrderStatus(
        uint256 _orderId,
        OrderStatus _status,
        string memory _trackingNumber
    ) external whenNotPaused onlyRole(VENDOR_ROLE) {
        require(drugOrders[_orderId].orderId != 0, "Order does not exist");
        require(drugOrders[_orderId].vendor == msg.sender, "Not the order vendor");

        drugOrders[_orderId].status = _status;
        drugOrders[_orderId].trackingNumber = _trackingNumber;
        drugOrders[_orderId].updatedAt = block.timestamp;

        emit OrderStatusUpdated(_orderId, _status);
    }

    function confirmDelivery(
        uint256 _orderId,
        string memory _ipfsReceiptHash
    ) external whenNotPaused onlyRole(HOSPITAL_ROLE) {
        require(drugOrders[_orderId].orderId != 0, "Order does not exist");
        require(
            drugRequests[drugOrders[_orderId].requestId].hospital == msg.sender,
            "Not the requesting hospital"
        );
        require(drugOrders[_orderId].status == OrderStatus.IN_TRANSIT, "Order not in transit");

        drugOrders[_orderId].status = OrderStatus.DELIVERED;
        drugOrders[_orderId].ipfsReceiptHash = _ipfsReceiptHash;
        drugOrders[_orderId].updatedAt = block.timestamp;

        emit DeliveryConfirmed(_orderId, _ipfsReceiptHash);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // View functions
    function getRequest(uint256 _requestId) external view returns (DrugRequest memory) {
        return drugRequests[_requestId];
    }

    function getOrder(uint256 _orderId) external view returns (DrugOrder memory) {
        return drugOrders[_orderId];
    }

    function getHospitalRequests(address _hospital) external view returns (uint256[] memory) {
        return hospitalRequests[_hospital];
    }

    function getVendorOrders(address _vendor) external view returns (uint256[] memory) {
        return vendorOrders[_vendor];
    }
} 