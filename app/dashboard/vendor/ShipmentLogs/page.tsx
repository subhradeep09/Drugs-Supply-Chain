'use client';

import { useEffect, useState } from 'react';

interface Medicine {
  _id: string;
  brandName: string;
  genericName: string;
  totalStock: number;
  minOfferPrice: number;
  batches: Batch[];
}

interface Batch {
  _id: string;
  batchNumber: string;
  expiryDate: string;
  manufacturingDate: string;
  stockQuantity: number;
  mrp: number;
  offerPrice: number;
}

export default function ViewInventoryPage() {
  const [inventory, setInventory] = useState<Medicine[]>([]);
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/vendor-inventory')
      .then(res => res.json())
      .then(data => setInventory(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">📦 My Inventory</h1>

      {inventory.length === 0 ? (
        <p>No inventory found.</p>
      ) : (
        <div className="space-y-6">
          {inventory.map(med => (
            <div
              key={med._id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">
                    {med.brandName} <span className="text-gray-500">({med.genericName})</span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Total Stock: <strong>{med.totalStock}</strong> | Starting at ₹{med.minOfferPrice}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setOpenDetails(openDetails === med._id ? null : med._id)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {openDetails === med._id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {openDetails === med._id && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2 text-gray-800">Batch Details:</h3>
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-3 py-2 text-left">Batch No.</th>
                        <th className="px-3 py-2 text-left">MFG</th>
                        <th className="px-3 py-2 text-left">EXP</th>
                        <th className="px-3 py-2 text-right">Stock</th>
                        <th className="px-3 py-2 text-right">MRP</th>
                        <th className="px-3 py-2 text-right">Offer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {med.batches.map(batch => (
                        <tr key={batch._id} className="border-t">
                          <td className="px-3 py-2">{batch.batchNumber}</td>
                          <td className="px-3 py-2">{new Date(batch.manufacturingDate).toLocaleDateString()}</td>
                          <td className="px-3 py-2">{new Date(batch.expiryDate).toLocaleDateString()}</td>
                          <td className="px-3 py-2 text-right">{batch.stockQuantity}</td>
                          <td className="px-3 py-2 text-right">₹{batch.mrp}</td>
                          <td className="px-3 py-2 text-right">₹{batch.offerPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
