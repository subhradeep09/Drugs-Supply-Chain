'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card';
import { Input } from '@/app/ui/input';
import { Search } from 'lucide-react';

interface Stat {
  medicineId: string;
  brandName: string;
  totalSold: number;
  totalStock: number;
}

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EC4899', '#14B8A6'];

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

  const handleExport = () => {
    const csvRows = [
      ['Medicine ID', 'Brand Name', 'Total Sold', 'Total Stock'],
      ...filteredData.map(item => [
        item.medicineId,
        item.brandName,
        item.totalSold,
        item.totalStock
      ])
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'pharmacy_consumption.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalSold = filteredData.reduce((acc, med) => acc + med.totalSold, 0);
  const totalStock = filteredData.reduce((acc, med) => acc + med.totalStock, 0);

  const pieData = [
    { name: 'Total Sold', value: totalSold },
    { name: 'In Stock', value: totalStock },
  ];

  const topSelling = [...filteredData].sort((a, b) => b.totalSold - a.totalSold).slice(0, 5);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pharmacy Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time medicine consumption insights</p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 bg-white shadow-sm"
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md shadow-md"
              onClick={handleExport}
            >
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="col-span-1 bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Medicines</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{filteredData.length}</div></CardContent>
          </Card>

          <Card className="col-span-1 bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sold</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-emerald-600">{totalSold}</div></CardContent>
          </Card>

          <Card className="col-span-1 bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {filteredData.filter(med => med.totalStock < 10 && med.totalStock > 0).length}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {filteredData.filter(med => med.totalStock === 0).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle>Sales vs Inventory</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="brandName" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Bar dataKey="totalSold" name="Sold" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="totalStock" name="In Stock" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle>Inventory Distribution</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Units']} contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-2 bg-white border-none shadow-sm">
            <CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="brandName" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="totalSold" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle>Top Selling Medicines</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSelling.map((item, index) => (
                  <div key={item.medicineId} className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center 
                      ${index === 0 ? 'bg-amber-100 text-amber-600' : 
                        index === 1 ? 'bg-purple-100 text-purple-600' : 
                        index === 2 ? 'bg-emerald-100 text-emerald-600' : 
                        'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium">{index + 1}</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.brandName}</div>
                      <div className="text-sm text-gray-500">Sold: {item.totalSold}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader><CardTitle>Medicine Inventory</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((med) => (
                    <tr key={med.medicineId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.brandName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.totalSold}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.totalStock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${med.totalStock === 0 ? 'bg-red-100 text-red-800' : 
                            med.totalStock < 10 ? 'bg-amber-100 text-amber-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {med.totalStock === 0 ? 'Out of Stock' : 
                           med.totalStock < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
