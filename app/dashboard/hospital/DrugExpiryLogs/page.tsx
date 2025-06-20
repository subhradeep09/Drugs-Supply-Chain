'use client';
import React, { useState } from 'react';

const mockDrugs = [
  { name: 'Paracetamol 500mg', batch: 'BATCH123', expiry: '2024-06-10' },
  { name: 'Amoxicillin 250mg', batch: 'BATCH124', expiry: '2024-07-01' },
  { name: 'Ibuprofen 400mg', batch: 'BATCH125', expiry: '2024-05-20' },
  { name: 'Omeprazole 20mg', batch: 'BATCH126', expiry: '2023-12-31' },
];

function isExpired(date: string) {
  return new Date(date) < new Date();
}
function isExpiringSoon(date: string) {
  const now = new Date();
  const expiry = new Date(date);
  const diff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff > 0 && diff < 30;
}

export default function DrugExpiryLogsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockDrugs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Drug Expiry Logs</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by drug or batch..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Expiry Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No drugs found.</td></tr>
            ) : filtered.map((d, i) => {
              const expired = isExpired(d.expiry);
              const expSoon = isExpiringSoon(d.expiry);
              return (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.batch}</td>
                  <td className="p-3">{new Date(d.expiry).toLocaleDateString()}</td>
                  <td className="p-3">
                    {expired ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Expired</span>
                    ) : expSoon ? (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Expiring Soon</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Valid</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
      `}</style>
    </div>
  );
} 