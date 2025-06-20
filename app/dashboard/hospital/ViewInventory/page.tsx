'use client';
import React, { useState } from 'react';

const mockInventory = [
  { drug: 'Paracetamol 500mg', batch: 'BATCH123', stock: 120, expiry: '2024-12-31' },
  { drug: 'Amoxicillin 250mg', batch: 'BATCH124', stock: 80, expiry: '2024-11-30' },
  { drug: 'Ibuprofen 400mg', batch: 'BATCH125', stock: 60, expiry: '2024-10-15' },
];

export default function ViewInventoryPage() {
  const [search, setSearch] = useState('');
  const filtered = mockInventory.filter(
    (d) =>
      d.drug.toLowerCase().includes(search.toLowerCase()) ||
      d.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">View Inventory</h1>
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
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No inventory found.</td></tr>
            ) : filtered.map((d, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.drug}</td>
                <td className="p-3">{d.batch}</td>
                <td className="p-3">{d.stock}</td>
                <td className="p-3">{new Date(d.expiry).toLocaleDateString()}</td>
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