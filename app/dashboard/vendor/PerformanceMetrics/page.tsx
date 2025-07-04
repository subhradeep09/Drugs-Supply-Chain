"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Medicine {
  _id: string;
  brandName: string;
  totalStock: number;
}

interface OrderStatusData {
  name: string;
  value: number;
}

export default function PerformanceMatrix() {
  const [inventoryData, setInventoryData] = useState<Medicine[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);

  useEffect(() => {
    // Inventory API
    fetch("/api/vendor-inventory")
      .then((res) => res.json())
      .then((data) => {
        const simplified = data.map((med: any) => ({
          _id: med._id,
          brandName: med.brandName,
          totalStock: med.totalStock,
        }));
        setInventoryData(simplified);
      })
      .catch((err) => console.error("Failed to load inventory data", err));

    // Orders API
    const fetchOrders = async () => {
      try {
        const resPending = await fetch("/api/vendor-received-orders");
        const pendingOrders = resPending.ok ? await resPending.json() : [];

        const resDispatched = await fetch("/api/vendor-request-delivery");
        const dispatchedOrders = resDispatched.ok ? await resDispatched.json() : [];

        const resDelivered = await fetch("/api/delivered_orders");
        const deliveredOrders = resDelivered.ok ? await resDelivered.json() : [];

        setOrderStatusData([
          { name: "Pending", value: pendingOrders.length },
          { name: "Dispatched", value: dispatchedOrders.length },
          { name: "Delivered", value: deliveredOrders.length },
        ]);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const COLORS = ["#FFBB28", "#8884d8", "#00C49F"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        📈 Inventory & Orders Performance Matrix
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stock Levels */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Stock Levels by Medicine</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="brandName" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f0f0f0' }} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="totalStock" fill="#4f46e5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2"> Order Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
