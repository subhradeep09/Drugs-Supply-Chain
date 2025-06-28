'use client';
import { useEffect, useState } from 'react';

export default function RequestDeliveryPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/vendor-received-orders');
      const data = await res.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRequestDelivery = async (orderId, orderType) => {
    try {
      await fetch('/api/requestDelivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderType }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Failed to request delivery:', error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Request Delivery</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Medicine</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No orders to display.
              </td>
            </tr>
          ) : (
            orders
              .filter(order => order.manufacturerStatus === 'Processing')
              .map(order => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="p-2 border">{order.orderId}</td>
                  <td className="p-2 border">{order.orderType}</td>
                  <td className="p-2 border">{order.hospitalName || order.pharmacyName}</td>
                  <td className="p-2 border">{order.medicineName}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">{order.manufacturerStatus}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleRequestDelivery(order.orderId, order.orderType)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Request Delivery
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
