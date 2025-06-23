'use client';
import { useEffect, useState } from 'react';

export default function RequestDeliveryPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    Promise.all([
      fetch('/api/orderh').then(res => res.json()),
      fetch('/api/orderp').then(res => res.json())
    ]).then(([hospitalOrders, pharmacyOrders]) => {
      const hospitalData = hospitalOrders.map(order => ({ ...order, orderType: 'Hospital' }));
      const pharmacyData = pharmacyOrders.map(order => ({ ...order, orderType: 'Pharmacy' }));
      setOrders([...hospitalData, ...pharmacyData]);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRequestDelivery = async (orderId, orderType) => {
    await fetch('/api/requestDelivery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, orderType }),
    });
    fetchOrders();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Request Delivery</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Type</th>
            <th>Customer</th>
            <th>Medicine</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.orderType}</td>
              <td>{order.hospitalName || order.pharmacyName}</td>
              <td>{order.medicineName}</td>
              <td>{order.quantity}</td>
              <td>{order.manufacturerStatus}</td>
              <td>
                {order.manufacturerStatus === 'Processing' && (
                  <button onClick={() => handleRequestDelivery(order.orderId, order.orderType)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Request Delivery
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
