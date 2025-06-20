'use client';
import { useEffect, useState } from 'react';

export default function HospitalOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approvedToday: 0,
    highPriority: 0,
    total: 0
  });

  useEffect(() => {
    fetch('/api/orderh')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        calculateStats(data);
      });
  }, []);

  const calculateStats = (data) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    const pending = data.filter(order => order.manufacturerStatus === "Pending").length;
    const approvedToday = data.filter(order =>
      order.manufacturerStatus === "Approved" &&
      order.deliveryDate?.slice(0, 10) === today
    ).length;
    const highPriority = data.filter(order => {
      if (!order.deliveryDate) return false;
      const delivery = new Date(order.deliveryDate);
      const diffDays = Math.ceil((delivery - new Date()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    }).length;
    const total = data.length;

    setStats({
      pending,
      approvedToday,
      highPriority,
      total
    });
  };

  const getPriority = (deliveryDate) => {
    if (!deliveryDate) return 'Unknown';
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffDays = Math.ceil((delivery - today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 3) return 'High';
    if (diffDays <= 7) return 'Medium';
    return 'Low';
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Hospital Requests</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending Requests</h2>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Approved Today</h2>
          <p className="text-2xl font-bold text-green-600">{stats.approvedToday}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">High Priority</h2>
          <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Requests</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Hospital Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Drugs</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Priority</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Request Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="text-center">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{order.hospitalName}</td>
                <td className="border px-4 py-2">{order.type || "Regular Supply"}</td>
                <td className="border px-4 py-2">{order.medicineName}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className={`border px-4 py-2 ${getPriority(order.deliveryDate) === 'High' ? 'text-red-600 font-bold' : ''}`}>
                  {getPriority(order.deliveryDate)}
                </td>
                <td className="border px-4 py-2">{order.manufacturerStatus || "Wait for confirmation"}</td>
                <td className="border px-4 py-2">{order.deliveryDate?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
