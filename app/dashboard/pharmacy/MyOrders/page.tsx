'use client';
import React, { useState } from 'react';

const mockOrders = [
  { orderId: 'PORD001', drug: 'Paracetamol 500mg', quantity: 60, status: 'Delivered', date: '2024-06-01' },
  { orderId: 'PORD002', drug: 'Amoxicillin 250mg', quantity: 30, status: 'Pending', date: '2024-06-03' },
];

export default function MyOrdersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockOrders.filter(
    (o) => o.drug.toLowerCase().includes(search.toLowerCase()) || o.orderId.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by drug or order ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-6">No orders found.</td></tr>
            ) : filtered.map((o, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.orderId}</td>
                <td className="p-3">{o.drug}</td>
                <td className="p-3">{o.quantity}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
      `}</style>
    </div>
  );
}