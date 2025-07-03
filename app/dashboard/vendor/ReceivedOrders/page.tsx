'use client';

import { useEffect, useState } from 'react';

interface DispatchedBatch {
  batchId: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  medicineName: string;
  quantity: number;
  totalValue: number;
  hospitalName: string;
  deliveryDate: string;
  orderDate: string;
  manufacturerStatus: string;
  dispatchedBatches: DispatchedBatch[];
}

export default function ReceivedOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vendor-received-orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading orders:', err);
        setIsLoading(false);
      });
  }, []);

  const handleAccept = async (mongoId: string) => {
    try {
      const res = await fetch('/api/vendor-accept-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: mongoId }), // send actual _id
      });

      const data = await res.json();
      if (res.ok) {
        alert('Order accepted and dispatched successfully.');
        setOrders((prev) => prev.filter((order) => order._id !== mongoId));
      } else {
        alert(data.error || 'Failed to accept order.');
      }
    } catch (error) {
      console.error('Accept error:', error);
    }
  };

  const handleReject = async (_id: string) => {
  try {
    const res = await fetch('/api/vendor-reject-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Order rejected successfully.');
      setOrders((prev) => prev.filter((order) => order._id !== _id));
    } else {
      alert(data.error || 'Failed to reject order.');
    }
  } catch (error) {
    console.error('Reject error:', error);
    alert('Error rejecting order.');
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Received Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No pending orders.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-bold mb-2">{order.medicineName}</h2>
              <p><b>Order ID:</b> {order.orderId}</p>
              <p><b>Hospital:</b> {order.hospitalName}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Total Price:</b> {order.totalValue}</p>
              <p><b>Order Date:</b> {order.orderDate?.slice(0, 10)}</p>
              <p><b>Delivery Date:</b> {order.deliveryDate?.slice(0, 10)}</p>
              <p><b>Status:</b> {order.manufacturerStatus}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleAccept(order._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Accept & Dispatch
                </button>
                <button
                  onClick={() => handleReject(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
