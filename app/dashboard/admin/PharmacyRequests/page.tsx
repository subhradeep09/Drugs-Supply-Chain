
"use client";

import { useEffect, useState } from 'react';

interface PharmacyOrder {
  _id: string;
  orderId: string;
  hospitalName: string;
  type: string;
  medicineName: string;
  quantity: number;
  deliveryDate: string;
  manufacturerStatus: string;
}

export default function PharmacyOrdersPage() {
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approvedToday: 0,
    highPriority: 0,
    total: 0,
  });

  useEffect(() => {
    fetch('/api/orderp')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || []);
        calculateStats(data || []);
      })
      .catch((error) => {
        console.error('Failed to fetch orders:', error);
      });
  }, []);

  const calculateStats = (data: PharmacyOrder[]) => {
    const today = new Date().toISOString().slice(0, 10);

    const pending = data.filter((order) => order.manufacturerStatus === 'Pending').length;
    const approvedToday = data.filter(
      (order) =>
        order.manufacturerStatus === 'Delivered' &&
        order.deliveryDate?.slice(0, 10) === today
    ).length;
    const highPriority = data.filter((order) => {
      if (!order.deliveryDate) return false;
      const delivery = new Date(order.deliveryDate);
      const diffDays = Math.ceil((delivery.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    }).length;
    const total = data.length;

    setStats({ pending, approvedToday, highPriority, total });
  };

  const getPriority = (deliveryDate: string) => {
    if (!deliveryDate) return 'Unknown';
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 3) return 'High';
    if (diffDays <= 7) return 'Medium';
    return 'Low';
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Pharmacy Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-yellow-400">
          <h2 className="text-lg font-medium text-gray-600">Pending Requests</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-green-500">
          <h2 className="text-lg font-medium text-gray-600">Approved Today</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.approvedToday}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-red-500">
          <h2 className="text-lg font-medium text-gray-600">High Priority</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.highPriority}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-blue-500">
          <h2 className="text-lg font-medium text-gray-600">Total Requests</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left bg-white border border-gray-200">
          <thead className="bg-blue-50 text-blue-900">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Pharmacy</th>
              <th className="px-6 py-3 font-medium">Drug</th>
              <th className="px-6 py-3 font-medium">Quantity</th>
              <th className="px-6 py-3 font-medium">Priority</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Request Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No hospital orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-800">{order.orderId}</td>
                  <td className="px-6 py-3 text-gray-600">{order.hospitalName}</td>
                  <td className="px-6 py-3 text-gray-600">{order.medicineName}</td>
                  <td className="px-6 py-3 text-gray-600">{order.quantity}</td>
                  <td className={`px-6 py-3 font-medium ${getPriority(order.deliveryDate) === 'High' ? 'text-red-600' : getPriority(order.deliveryDate) === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{getPriority(order.deliveryDate)}</td>
                  <td className="px-6 py-3 text-gray-600">{order.manufacturerStatus || 'Pending'}</td>
                  <td className="px-6 py-3 text-gray-600">{order.deliveryDate?.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
