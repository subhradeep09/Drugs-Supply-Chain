'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function PerformanceMonitoringPage() {
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    avgDeliveryTime: '0',
    fulfillmentRate: '0%',
    lowStockIncidents: 0,
    expiredDrugs: 0,
  });
  const [chartsData, setChartsData] = useState({
    vendorOrders: [],
    topDrugs: [],
    topHospitals: [],
    topPharmacies: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin-performance-metrics?filter=${filter}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setMetrics(data.metrics);
        setChartsData(data.charts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  // Color palette for charts
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B'];

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-[80vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header with filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Monitoring</h1>
          <p className="text-gray-500">Track and analyze system performance metrics</p>
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-700"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard 
          label="Orders Processed" 
          value={metrics.totalOrders} 
          icon="📦"
          trend={metrics.totalOrders > 1000 ? 'up' : 'down'}
          change={metrics.totalOrders > 1000 ? '12%' : '5%'}
        />
        <MetricCard 
          label="Avg. Delivery Time" 
          value={`${metrics.avgDeliveryTime} hrs`} 
          icon="⏱️"
          trend={parseFloat(metrics.avgDeliveryTime) < 4 ? 'down' : 'up'}
          change={parseFloat(metrics.avgDeliveryTime) < 4 ? '8%' : '3%'}
        />
        <MetricCard 
          label="Fulfillment Rate" 
          value={metrics.fulfillmentRate} 
          icon="✅"
          trend={parseFloat(metrics.fulfillmentRate) > 95 ? 'up' : 'down'}
          change={parseFloat(metrics.fulfillmentRate) > 95 ? '2%' : '1%'}
        />
        <MetricCard 
          label="Low Stock Incidents" 
          value={metrics.lowStockIncidents} 
          icon="⚠️"
          trend={metrics.lowStockIncidents < 15 ? 'down' : 'up'}
          change={metrics.lowStockIncidents < 15 ? '10%' : '5%'}
        />
        <MetricCard 
          label="Expired Drugs" 
          value={metrics.expiredDrugs} 
          icon="💊"
          trend={metrics.expiredDrugs < 5 ? 'down' : 'up'}
          change={metrics.expiredDrugs < 5 ? '15%' : '8%'}
        />
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Trends & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Vendors with Highest Orders" 
            data={chartsData.vendorOrders} 
            dataKey="vendor" 
            valueKey="orders" 
            color={colors[0]}
          />
          <ChartCard 
            title="Top Ordered Drugs" 
            data={chartsData.topDrugs} 
            dataKey="medicine" 
            valueKey="count" 
            color={colors[1]}
          />
          <ChartCard 
            title="Top Ordering Hospitals" 
            data={chartsData.topHospitals} 
            dataKey="hospital" 
            valueKey="orders" 
            color={colors[2]}
          />
          <ChartCard 
            title="Top Ordering Pharmacies" 
            data={chartsData.topPharmacies} 
            dataKey="pharmacy" 
            valueKey="orders" 
            color={colors[3]}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  label, 
  value, 
  icon,
  trend,
  change
}: { 
  label: string; 
  value: string | number; 
  icon: string;
  trend: 'up' | 'down';
  change: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 text-xl">
          {icon}
        </div>
        <span className={`inline-flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  data,
  dataKey,
  valueKey,
  color,
}: {
  title: string;
  data: any[];
  dataKey: string;
  valueKey: string;
  color: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" axisLine={false} tickLine={false} />
          <YAxis 
            dataKey={dataKey} 
            type="category" 
            width={80}
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
          />
          <Bar dataKey={valueKey} radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} opacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}