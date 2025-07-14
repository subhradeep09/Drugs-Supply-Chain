'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';
import { Card, CardContent, CardTitle } from '@/app/ui/card';
import { Input } from '@/app/ui/input';

interface Stat {
  medicineId: string;
  brandName: string;
  totalSold: number;
  totalStock: number;
}

const COLORS = ['#10B981', '#6366F1', '#F59E0B'];

export default function ConsumptionChartPage() {
  const [data, setData] = useState<Stat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/pharm_consumption')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  const filteredData = data.filter((item) =>
    item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSold = filteredData.reduce((acc, med) => acc + med.totalSold, 0);
  const totalStock = filteredData.reduce((acc, med) => acc + med.totalStock, 0);

  const pieData = [
    { name: 'Total Sold', value: totalSold },
    { name: 'In Stock', value: totalStock },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800 drop-shadow">
          Pharmacy Consumption Dashboard
        </h1>

        <div className="mb-8 max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="🔍 Search by medicine name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border-2 border-indigo-300 px-5 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stacked Bar Chart */}
          <Card className="rounded-3xl bg-white shadow-xl border border-indigo-100">
            <CardTitle className="text-xl px-6 pt-6 text-indigo-700 font-semibold">
              📊 Sold vs Stock (Stacked Bar)
            </CardTitle>
            <CardContent className="h-[400px]">
              {filteredData.length === 0 ? (
                <p className="text-center mt-10 text-gray-500">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brandName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSold" stackId="a" fill="#6366F1" />
                    <Bar dataKey="totalStock" stackId="a" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Donut Chart */}
          <Card className="rounded-3xl bg-white shadow-xl border border-indigo-100">
            <CardTitle className="text-xl px-6 pt-6 text-indigo-700 font-semibold">
              🥯 Stock vs Sold
            </CardTitle>
            <CardContent className="h-[400px] flex justify-center items-center">
              {totalSold === 0 && totalStock === 0 ? (
                <p className="text-center text-gray-500">No stock/sold data available</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Line Chart */}
        <div className="mt-12">
          <Card className="rounded-3xl bg-white shadow-xl border border-indigo-100">
            <CardTitle className="text-xl px-6 pt-6 text-indigo-700 font-semibold">
              📈 Trend Overview (Line Chart)
            </CardTitle>
            <CardContent className="h-[300px]">
              {filteredData.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brandName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalSold" stroke="#6366F1" strokeWidth={3} />
                    <Line type="monotone" dataKey="totalStock" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <div className="mt-12 overflow-x-auto">
          <Card className="rounded-3xl bg-white shadow-xl border border-indigo-100">
            <CardTitle className="text-xl px-6 pt-6 text-indigo-700 font-semibold">📋 Consumption Table</CardTitle>
            <CardContent>
              {filteredData.length === 0 ? (
                <p className="text-center py-10 text-gray-500">No records found</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Medicine Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Sold</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredData.map((med) => (
                      <tr key={med.medicineId} className="hover:bg-indigo-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-800">{med.brandName}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{med.totalSold}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{med.totalStock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
