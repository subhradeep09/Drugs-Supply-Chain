'use client';
import React from 'react';

const metrics = [
  { label: 'Total Orders', value: 320 },
  { label: 'Orders Dispatched', value: 310 },
  { label: 'Avg. Dispatch Time (hrs)', value: 24 },
  { label: 'Returns', value: 5 },
];

export default function PerformanceMetricsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Performance Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-gray-500">{m.label}</span>
            <span className="text-2xl font-bold">{m.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Vendor Performance Overview</h2>
        <p>Monitor your order fulfillment and dispatch efficiency here.</p>
      </div>
    </div>
  );
}