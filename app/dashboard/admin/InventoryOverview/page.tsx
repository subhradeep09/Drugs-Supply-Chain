'use client';

import { useState, useEffect } from 'react';

export default function OrderPage() {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDrugs: 0,
    totalStock: 0,
    lowStock: 0,
  });

  useEffect(() => {
    fetch('/api/medicines/public')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        calculateStats(data);
        setIsLoading(false);
      });
  }, []);

  const calculateStats = (data: any[]) => {
    const totalDrugs = data.length;
    const totalStock = data.reduce((sum, med) => sum + (med.totalStock || 0), 0);
    const lowStock = data.filter(med => (med.totalStock || 0) < 100).length;

    setStats({
      totalDrugs,
      totalStock,
      lowStock,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">💊 Medicine Inventory Dashboard</h1>

        {/* Stats Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md text-center">
            <h2 className="text-lg font-medium text-gray-600">Total Medicines</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalDrugs}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md text-center">
            <h2 className="text-lg font-medium text-gray-600">Total Stock</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalStock}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md text-center">
            <h2 className="text-lg font-medium text-gray-600">Low Stock (&lt; 100)</h2>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.lowStock}</p>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="overflow-x-auto bg-white/80 border border-gray-200 rounded-xl shadow-md">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-blue-100 text-gray-900 font-semibold text-left">
                <th className="px-6 py-4 border-b">Brand Name</th>
                <th className="px-6 py-4 border-b">Generic Name</th>
                <th className="px-6 py-4 border-b">Form</th>
                <th className="px-6 py-4 border-b">Strength</th>
                <th className="px-6 py-4 border-b">Vendor</th>
                <th className="px-6 py-4 border-b">Total Stock</th>
                <th className="px-6 py-4 border-b">MRP</th>
                <th className="px-6 py-4 border-b">Min Offer Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {medicines.map((medicine, idx) => (
                <tr
                  key={medicine._id}
                  className={`hover:bg-blue-50 transition duration-150 ease-in-out ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">{medicine.brandName}</td>
                  <td className="px-6 py-4">{medicine.genericName}</td>
                  <td className="px-6 py-4">{medicine.form}</td>
                  <td className="px-6 py-4">{medicine.strength}</td>
                  <td className="px-6 py-4">{medicine.vendorName}</td>
                  <td className="px-6 py-4">{medicine.totalStock}</td>
                  <td className="px-6 py-4">₹{medicine.mrp}</td>
                  <td className="px-6 py-4 text-green-700 font-medium">
                    ₹{medicine.minOfferPrice}
                  </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-8 text-gray-500">
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
