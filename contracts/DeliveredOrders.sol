// contracts/DeliveredOrders.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeliveredOrders {
    struct Order {
        string orderId;
        string hospitalName;
        string medicineId;
        string medicineName;
        uint256 quantity;
        string vendorId;
        string vendorName;
    }

    Order[] public deliveredOrders;

    function addDeliveredOrder(
        string memory orderId,
        string memory hospitalName,
        string memory medicineId,
        string memory medicineName,
        uint256 quantity,
        string memory vendorId,
        string memory vendorName
    ) public {
        deliveredOrders.push(Order(orderId, hospitalName, medicineId, medicineName, quantity, vendorId, vendorName));
    }

    function getDeliveredOrders() public view returns (Order[] memory) {
        return deliveredOrders;
    }

    function getOrderCount() public view returns (uint256) {
        return deliveredOrders.length;
    }
}
