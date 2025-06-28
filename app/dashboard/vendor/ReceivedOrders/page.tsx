'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/ui/table';

export default function ManufacturerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [orderTypeFilter, setOrderTypeFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/vendor-received-orders');
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Failed to fetch vendor orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status, orderType) => {
    const apiPath =
      orderType === 'Hospital'
        ? '/api/orderh/updateStatus'
        : '/api/orderp/updateStatus';

    await fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });

    fetchOrders(); // Re-fetch updated list
  };

  const handleSearchAndFilter = () => {
    let filtered = orders;

    if (orderTypeFilter !== 'All') {
      filtered = filtered.filter(
        (order) => order.orderType === orderTypeFilter
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((order) =>
        `${order.hospitalName || order.pharmacyName || ''} ${
          order.medicineName || ''
        }`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(
        (order) => (order.manufacturerStatus || 'Pending') === filterStatus
      );
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filterStatus, orderTypeFilter, orders]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Vendor - Received Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by Hospital / Pharmacy / Medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-64"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-3"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={orderTypeFilter}
          onChange={(e) => setOrderTypeFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Types</option>
          <option value="Hospital">Hospital</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Hospital / Pharmacy</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>{order.hospitalName || order.pharmacyName}</TableCell>
              <TableCell>{order.medicineName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.manufacturerStatus || 'Pending'}</TableCell>
              <TableCell>
                {!order.manufacturerStatus ||
                order.manufacturerStatus === 'Pending' ? (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(order.orderId, 'Processing', order.orderType)
                      }
                      className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(order.orderId, 'Rejected', order.orderType)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="font-semibold">
                    {order.manufacturerStatus}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
