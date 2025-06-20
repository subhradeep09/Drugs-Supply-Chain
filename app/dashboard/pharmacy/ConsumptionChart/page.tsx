'use client';
import React from 'react';

const mockConsumption = [
  { drug: 'Paracetamol 500mg', consumed: 120 },
  { drug: 'Amoxicillin 250mg', consumed: 80 },
  { drug: 'Ibuprofen 400mg', consumed: 60 },
];

export default function ConsumptionChartPage() {
  const max = Math.max(...mockConsumption.map(c => c.consumed));
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Consumption Chart</h1>
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Drug Consumption (Bar Chart)</h2>
        <svg width="100%" height="120">
          {mockConsumption.map((c, i) => (
            <g key={c.drug}>
              <rect
                x={i * 120 + 20}
                y={100 - (c.consumed / max) * 80}
                width="60"
                height={(c.consumed / max) * 80}
                fill="#2563eb"
                rx="6"
              />
              <text x={i * 120 + 50} y={115} textAnchor="middle" fontSize="12">{c.drug.split(' ')[0]}</text>
              <text x={i * 120 + 50} y={90 - (c.consumed / max) * 80} textAnchor="middle" fontSize="12" fill="#2563eb">{c.consumed}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Consumed</th>
            </tr>
          </thead>
          <tbody>
            {mockConsumption.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.drug}</td>
                <td className="p-3">{c.consumed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 