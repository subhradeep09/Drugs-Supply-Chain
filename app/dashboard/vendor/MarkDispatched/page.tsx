'use client';
import React, { useState } from 'react';

const mockOrders = [
  { orderId: 'VORD002', drug: 'Amoxicillin 250mg', quantity: 150, status: 'Pending' },
  { orderId: 'VORD003', drug: 'Ibuprofen 400mg', quantity: 100, status: 'Pending' },
];

export default function MarkDispatchedPage() {
  const [orders, setOrders] = useState(mockOrders);

  const handleDispatch = (orderId: string) => {
    setOrders(prev =>
      prev.map(o =>
        o.orderId === orderId ? { ...o, status: 'Dispatched' } : o
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mark Dispatched</h1>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-6">No pending orders.</td></tr>
            ) : orders.map((o, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.orderId}</td>
                <td className="p-3">{o.drug}</td>
                <td className="p-3">{o.quantity}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">
                  {o.status === 'Pending' ? (
                    <button className="btn-primary" onClick={() => handleDispatch(o.orderId)}>
                      Mark Dispatched
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Dispatched</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
      `}</style>
    </div>
  );
}