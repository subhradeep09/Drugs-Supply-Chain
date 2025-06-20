'use client';
import React, { useState } from 'react';

const mockAlerts = [
  { message: 'Low stock: Paracetamol 500mg', date: '2024-06-01', type: 'Stock' },
  { message: 'Feedback: Damaged packaging reported', date: '2024-06-02', type: 'Feedback' },
];

export default function FeedbackAlertsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAlerts.filter(
    (a) => a.message.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Feedback & Alerts</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search alerts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} className="text-center p-6">No alerts found.</td></tr>
            ) : filtered.map((a, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.message}</td>
                <td className="p-3">{a.type}</td>
                <td className="p-3">{a.date}</td>
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