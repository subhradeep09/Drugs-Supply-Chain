'use client';
import React, { useState } from 'react';

const mockAlerts = [
  { drug: 'Paracetamol 500mg', stock: 40, min: 100 },
  { drug: 'Amoxicillin 250mg', stock: 20, min: 80 },
  { drug: 'Ibuprofen 400mg', stock: 10, min: 50 },
];

export default function LowStockAlertsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAlerts.filter(
    (a) => a.drug.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Low Stock Alerts</h1>
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
              <th className="p-3 text-left">Current Stock</th>
              <th className="p-3 text-left">Min Required</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No low stock alerts.</td></tr>
            ) : filtered.map((a, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.drug}</td>
                <td className="p-3">{a.stock}</td>
                <td className="p-3">{a.min}</td>
                <td className="p-3">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Low Stock</span>
                </td>
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