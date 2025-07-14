'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import { saveAs } from 'file-saver';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function ReportsAnalytics() {
  const [summary, setSummary] = useState({
    monthlySales: 0,
    totalOrders: 0,
    inventoryValue: 0,
    expiredDrugs: 0,
  });

  type PieDataItem = { name: string; value: number };
  type BarDataItem = { name: string; sales: number };

  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [barData, setBarData] = useState<BarDataItem[]>([]);

  useEffect(() => {
    fetch('/api/admin_analytics')
      .then(res => res.json())
      .then(data => {
        setSummary({
          monthlySales: data.monthlySales,
          totalOrders: data.totalOrders,
          inventoryValue: data.inventoryValue,
          expiredDrugs: data.expiredDrugs,
        });
        setPieData(data.orderStatusDistribution || []);
        setBarData(data.monthlySalesTrend || []);
      });
  }, []);

  const exportToCSV = () => {
    const csvRows = [
      ['Metric', 'Value'],
      ['Monthly Sales', summary.monthlySales],
      ['Total Orders', summary.totalOrders],
      ['Inventory Value', summary.inventoryValue],
      ['Expired Drugs', summary.expiredDrugs],
      [],
      ['Order Status', 'Count'],
      ...((pieData && Array.isArray(pieData)) ? pieData.map(item => [item.name, item.value]) : []),
      [],
      ['Month', 'Sales'],
      ...((barData && Array.isArray(barData)) ? barData.map(item => [item.name, item.sales]) : [])
    ];

    const validRows = csvRows.filter(row => Array.isArray(row));
    const csvString = validRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'admin_analytics_report.csv');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center"> Admin Reports & Analytics</h1>

        {/* Export Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={exportToCSV}
            className="bg-white border px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Monthly Sales', value: `₹${summary.monthlySales.toLocaleString()}`, color: 'text-blue-700' },
            { title: 'Total Orders', value: summary.totalOrders, color: 'text-green-700' },
            { title: 'Inventory Value', value: `₹${summary.inventoryValue.toLocaleString()}`, color: 'text-purple-700' },
            { title: 'Expired Drugs', value: summary.expiredDrugs, color: 'text-red-600' }
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border">
              <h2 className="text-md text-gray-500 font-semibold text-center">{card.title}</h2>
              <p className={`text-3xl font-bold mt-2 text-center ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Monthly Sales Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
