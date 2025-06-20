'use client';
import React, { useEffect, useState } from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const API_URL = '/api/drugs';

interface Drug {
  _id?: string;
  brandName: string;
  genericName: string;
  category: string;
  dosageForm: string;
  strength: string;
  batchNumber: string;
  expiryDate: string;
  stockQuantity: number;
  mrp: number;
}

function InventoryBadge({ stockQuantity, expiryDate }: { stockQuantity: number; expiryDate: string }) {
  const isLowStock = stockQuantity < 100;
  const isExpired = new Date(expiryDate) < new Date();
  if (isExpired)
    return (
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs flex items-center gap-1">
        <ExclamationTriangleIcon className="w-4 h-4" /> Expired
      </span>
    );
  if (isLowStock)
    return (
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs flex items-center gap-1">
        <ExclamationTriangleIcon className="w-4 h-4" /> Low Stock
      </span>
    );
  return (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1">
      <CheckCircleIcon className="w-4 h-4" /> In Stock
    </span>
  );
}

export default function InventoryOverviewPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDrugs = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}&limit=1000`);
      const data = await res.json();
      setDrugs(data.drugs);
      setLoading(false);
    };
    fetchDrugs();
  }, [search]);

  const totalDrugs = drugs.length;
  const totalStock = drugs.reduce((sum, d) => sum + (d.stockQuantity || 0), 0);
  const lowStock = drugs.filter(d => d.stockQuantity < 100).length;
  const expired = drugs.filter(d => new Date(d.expiryDate) < new Date()).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Inventory Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Total Drugs</span>
          <span className="text-2xl font-bold">{totalDrugs}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Total Stock</span>
          <span className="text-2xl font-bold">{totalStock}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Low Stock</span>
          <span className="text-2xl font-bold text-yellow-600">{lowStock}</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Expired</span>
          <span className="text-2xl font-bold text-red-600">{expired}</span>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by name or generic..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Brand Name</th>
              <th className="p-3 text-left">Generic Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Dosage</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center p-6">Loading...</td></tr>
            ) : drugs.length === 0 ? (
              <tr><td colSpan={8} className="text-center p-6">No drugs found.</td></tr>
            ) : drugs.map(drug => (
              <tr key={drug._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{drug.brandName}</td>
                <td className="p-3">{drug.genericName}</td>
                <td className="p-3">{drug.category}</td>
                <td className="p-3">{drug.strength} {drug.dosageForm}</td>
                <td className="p-3">{drug.batchNumber}</td>
                <td className="p-3">{drug.expiryDate ? new Date(drug.expiryDate).toLocaleDateString() : '-'}</td>
                <td className="p-3">{drug.stockQuantity}</td>
                <td className="p-3"><InventoryBadge stockQuantity={drug.stockQuantity} expiryDate={drug.expiryDate} /></td>
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