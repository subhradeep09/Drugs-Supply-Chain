'use client';
import React, { useState } from 'react';

const mockShipments = [
  { shipmentId: 'SHIP001', orderId: 'VORD001', status: 'Delivered', date: '2024-06-01' },
  { shipmentId: 'SHIP002', orderId: 'VORD002', status: 'In Transit', date: '2024-06-03' },
];

export default function ShipmentLogsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockShipments.filter(
    (s) => s.shipmentId.toLowerCase().includes(search.toLowerCase()) || s.orderId.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shipment Logs</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by shipment or order ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Shipment ID</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No shipments found.</td></tr>
            ) : filtered.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{s.shipmentId}</td>
                <td className="p-3">{s.orderId}</td>
                <td className="p-3">{s.status}</td>
                <td className="p-3">{s.date}</td>
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