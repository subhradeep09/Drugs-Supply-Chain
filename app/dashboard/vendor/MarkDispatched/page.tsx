'use client';

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  orderId: string;
  hospitalName?: string;
  quantity: number;
  medicineId: {
    name: string;
  };
  medicineName: string;
  manufacturerStatus: string;
  orderDate: string;
  deliveryDate: string;
}

export default function VendorRequestDeliveryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vendor-request-delivery');
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestDelivery = async (ordersId: string) => {
    try {
      const res = await fetch('/api/vendor-request-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ordersId }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Requested for delivery.');
        fetchOrders();
      } else {
        alert(data.error || 'Failed to request delivery');
      }
    } catch (err) {
      console.error('Error requesting delivery:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pending Orders (Vendor)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No pending orders.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 bg-white shadow rounded border">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Hospital:</b> {order.hospitalName}</p>
              <p><b>Medicine:</b> {order.medicineName}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Status:</b> {order.manufacturerStatus}</p>
              <p><b>Delivery Date:</b> {order.deliveryDate?.slice(0, 10)}</p>

              <button
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleRequestDelivery(order._id)}
              >
                Request for Delivery
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
