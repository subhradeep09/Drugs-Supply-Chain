'use client';

import { useEffect, useState } from 'react';

interface InventoryItem {
  _id: string;
  medicineName: string;
  totalStock: number;
  lastOrderedDate: string;
}

export default function HospitalInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hospital-inventory')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInventory(data);
        } else {
          console.error('Invalid inventory format', data);
          setInventory([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Inventory fetch failed:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">🏥 Hospital Medicine Inventory</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4">Medicine Name</th>
                  <th className="py-2 px-4">Total Stock</th>
                  <th className="py-2 px-4">Last Ordered</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? (
                  inventory.map(item => (
                    <tr key={item._id} className="border-t">
                      <td className="py-2 px-4">{item.medicineName}</td>
                      <td className="py-2 px-4">{item.totalStock}</td>
                      <td className="py-2 px-4">
                        {new Date(item.lastOrderedDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        {item.totalStock < 10 ? (
                          <span className="text-red-600 font-semibold">Low Stock</span>
                        ) : (
                          <span className="text-green-600 font-semibold">OK</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-4">
                      No inventory data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
