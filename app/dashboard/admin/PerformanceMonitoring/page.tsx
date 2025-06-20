'use client';
import React from 'react';

export default function PerformanceMonitoringPage() {
  // Placeholder data for demonstration
  const metrics = [
    { label: 'Orders Processed', value: 1240 },
    { label: 'Avg. Delivery Time (hrs)', value: 36 },
    { label: 'Fulfillment Rate', value: '98%' },
    { label: 'Low Stock Incidents', value: 12 },
    { label: 'Expired Drugs', value: 3 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Performance Monitoring</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-gray-500">{m.label}</span>
            <span className="text-2xl font-bold">{m.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Trends & Analytics</h2>
        {/* Placeholder for charts - can be replaced with a chart library */}
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed rounded">
          [Charts Coming Soon]
        </div>
      </div>
    </div>
  );
} 