'use client';
import React, { useState } from 'react';

const mockUsage = [
  { drug: 'Paracetamol 500mg', quantity: 20, date: '2024-06-01', recipient: 'Ward A' },
  { drug: 'Amoxicillin 250mg', quantity: 10, date: '2024-06-02', recipient: 'Ward B' },
  { drug: 'Ibuprofen 400mg', quantity: 15, date: '2024-06-03', recipient: 'Ward C' },
];

export default function UsageHistoryPage() {
  const [search, setSearch] = useState('');
  const filtered = mockUsage.filter(
    (u) =>
      u.drug.toLowerCase().includes(search.toLowerCase()) ||
      u.recipient.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Usage History</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by drug or recipient..."
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
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Recipient</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No usage history found.</td></tr>
            ) : filtered.map((u, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.drug}</td>
                <td className="p-3">{u.quantity}</td>
                <td className="p-3">{u.date}</td>
                <td className="p-3">{u.recipient}</td>
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