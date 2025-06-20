'use client';
import React, { useState } from 'react';

const mockDeliveries = [
  { orderId: 'ORD001', drug: 'Paracetamol 500mg', quantity: 100, deliveryDate: '2024-06-01', status: 'Delivered' },
  { orderId: 'ORD002', drug: 'Amoxicillin 250mg', quantity: 50, deliveryDate: '2024-06-02', status: 'Delivered' },
  { orderId: 'ORD003', drug: 'Ibuprofen 400mg', quantity: 75, deliveryDate: '2024-06-03', status: 'Pending' },
];

export default function DeliveryLogPage() {
  const [search, setSearch] = useState('');
  const filtered = mockDeliveries.filter(
    (d) =>
      d.orderId.toLowerCase().includes(search.toLowerCase()) ||
      d.drug.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Delivery Logs</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by order ID or drug..."
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
              <th className="p-3 text-left">Delivery Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-6">No deliveries found.</td></tr>
            ) : filtered.map((d, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.orderId}</td>
                <td className="p-3">{d.drug}</td>
                <td className="p-3">{d.quantity}</td>
                <td className="p-3">{d.deliveryDate}</td>
                <td className="p-3">{d.status}</td>
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