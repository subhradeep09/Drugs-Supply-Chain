'use client';

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  orderId: string;
  medicineName: string;
  quantity: number;
  deliveryDate: string;
  manufacturerStatus: string;
  totalValue: number;
}

export default function TrackOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pharmacy-out-for-delivery');
      const data = await res.json();
      setOrders(data.orders || []);
      setFilteredOrders(data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
    setLoading(false);
  };

  const markAsDelivered = async (orderId: string) => {
    try {
      const res = await fetch('/api/pharmacy-mark-delivered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Order marked as Delivered');
        fetchOrders();
      } else {
        alert(data.error || 'Failed to update order');
      }
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update order');
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const lower = value.toLowerCase();
    const filtered = orders.filter(
      (o) =>
        o.medicineName.toLowerCase().includes(lower) ||
        o.orderId.toLowerCase().includes(lower)
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const csv = [
      ['Order ID', 'Medicine Name', 'Quantity', 'Delivery Date', 'Total Value'],
      ...filteredOrders.map((o) => [
        o.orderId,
        o.medicineName,
        o.quantity,
        new Date(o.deliveryDate).toLocaleDateString(),
        o.totalValue,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">📦 Track Incoming Orders</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by medicine/order ID..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No matching orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Medicine</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Delivery Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Total Value</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayedOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{order.orderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.medicineName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{order.totalValue}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs rounded-full">
                        {order.manufacturerStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => markAsDelivered(order.orderId)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded shadow"
                      >
                        Package Received
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)}–
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
