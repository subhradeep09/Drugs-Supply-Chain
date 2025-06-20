'use client';
import React, { useState } from 'react';

const mockTransfers = [
  { drug: 'Paracetamol 500mg', quantity: 20, from: 'Main', to: 'Ward A', date: '2024-06-01', status: 'Completed' },
  { drug: 'Ibuprofen 400mg', quantity: 10, from: 'Main', to: 'Ward B', date: '2024-06-02', status: 'Pending' },
];

export default function InternalTransfersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockTransfers.filter(
    (t) => t.drug.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Internal Transfers</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by drug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center p-6">No transfers found.</td></tr>
            ) : filtered.map((t, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.drug}</td>
                <td className="p-3">{t.quantity}</td>
                <td className="p-3">{t.from}</td>
                <td className="p-3">{t.to}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.status}</td>
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