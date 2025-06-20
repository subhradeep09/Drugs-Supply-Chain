'use client';
import { useState, useEffect } from 'react';

export default function OrderPage() {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDrugs: 0,
    totalStock: 0,
    lowStock: 0,
    expired: 0,
  });

  useEffect(() => {
    fetch('/api/medicines')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        calculateStats(data);
        setIsLoading(false);
      });
  }, []);

  const calculateStats = (data) => {
    const totalDrugs = data.length;
    const totalStock = data.reduce((sum, med) => sum + (med.stockQuantity || 0), 0);
    const lowStock = data.filter(med => (med.stockQuantity || 0) < 100).length;
    const today = new Date();
    const expired = data.filter(med => {
      if (!med.expiryDate) return false;
      const expiry = new Date(med.expiryDate);
      return expiry < today;
    }).length;

    setStats({
      totalDrugs,
      totalStock,
      lowStock,
      expired,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Medicine Inventory</h1>

        {/* Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Total Drugs</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.totalDrugs}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Total Stock</h2>
            <p className="text-2xl font-bold text-green-600">{stats.totalStock}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Low Stock (&lt; 100)</h2>
            <p className="text-2xl font-bold text-yellow-500">{stats.lowStock}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Expired</h2>
            <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Brand Name</th>
                <th className="px-4 py-2 border">Generic Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Dosage</th>
                <th className="px-4 py-2 border">Batch No</th>
                <th className="px-4 py-2 border">Expiry Date</th>
                <th className="px-4 py-2 border">Stock Quantity</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine._id} className="text-center">
                  <td className="px-4 py-2 border">{medicine.brandName}</td>
                  <td className="px-4 py-2 border">{medicine.genericName}</td>
                  <td className="px-4 py-2 border">{medicine.category}</td>
                  <td className="px-4 py-2 border">{medicine.dosageForm}</td>
                  <td className="px-4 py-2 border">{medicine.batchNumber}</td>
                  <td className="px-4 py-2 border">{medicine.expiryDate?.slice(0,10)}</td>
                  <td className="px-4 py-2 border">{medicine.stockQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
