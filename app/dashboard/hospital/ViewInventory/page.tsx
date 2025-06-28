'use client';

import { useEffect, useState } from 'react';

interface InventoryItem {
  _id: string;
  medicineName: string;
  totalDelivered: number;
  expiryDate: string; // Still in type, but unused
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('/api/hospital-inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setFilteredInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Inventory fetch failed:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = inventory.filter(item =>
      item.medicineName.toLowerCase().includes(term)
    );
    setFilteredInventory(filtered);
  }, [searchTerm, inventory]);

  const sortByQuantity = () => {
    const sorted = [...filteredInventory].sort((a, b) =>
      sortAsc ? a.totalDelivered - b.totalDelivered : b.totalDelivered - a.totalDelivered
    );
    setFilteredInventory(sorted);
    setSortAsc(!sortAsc);
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Medicine Name', 'Total Delivered'],
      ...filteredInventory.map(item => [
        item.medicineName,
        item.totalDelivered,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search medicine..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={sortByQuantity}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sort by Quantity {sortAsc ? '↑' : '↓'}
          </button>

          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Medicine Name</th>
                <th className="py-2 px-4">Total Delivered Quantity</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="py-2 px-4">{item.medicineName}</td>
                    <td className="py-2 px-4">{item.totalDelivered}</td>
                    <td className="py-2 px-4">
                      {item.totalDelivered < 10 ? (
                        <span className="text-red-600 font-semibold">Low Stock</span>
                      ) : (
                        <span className="text-green-600">OK</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
