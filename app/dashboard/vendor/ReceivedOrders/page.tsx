'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/ui/table';

export default function ManufacturerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = () => {
    fetch('/api/orderh')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setFilteredOrders(data);
      });
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, status) => {
    await fetch('/api/orderh/updateStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status })
    });
    fetchOrders();
  };

  const handleSearchAndFilter = () => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(order =>
        order.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(order =>
        (order.manufacturerStatus || 'Pending') === filterStatus
      );
    }

    setFilteredOrders(filtered);
  };

  // Call filter every time search or filterStatus changes
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filterStatus, orders]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Manufacturer - Received Orders</h1>

      {/* Search and Filter Section */}
      <div className="flex mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by Hospital or Medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-1/3"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.hospitalName}</TableCell>
              <TableCell>{order.medicineName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.manufacturerStatus || "Pending"}</TableCell>
              <TableCell>
                {(!order.manufacturerStatus || order.manufacturerStatus === "Pending") ? (
                  <>
                    <button 
                      onClick={() => updateStatus(order.orderId, "Processing")} 
                      className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(order.orderId, "Rejected")} 
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="font-semibold">{order.manufacturerStatus}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
