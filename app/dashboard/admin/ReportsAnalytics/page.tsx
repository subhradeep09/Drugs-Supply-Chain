'use client';
import React from 'react';

export default function ReportsAnalyticsPage() {
  // Placeholder data for demonstration
  const reports = [
    { name: 'Monthly Sales', value: '₹1,20,000' },
    { name: 'Total Orders', value: 320 },
    { name: 'Inventory Value', value: '₹2,50,000' },
    { name: 'Expired Drugs', value: 3 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      <div className="flex gap-4 mb-6">
        <button className="btn-primary">Export CSV</button>
        <button className="btn-secondary">Download PDF</button>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <table className="min-w-full text-sm">
          <tbody>
            {reports.map((r) => (
              <tr key={r.name} className="border-b">
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
        .btn-secondary { @apply bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition; }
      `}</style>
    </div>
  );
} 