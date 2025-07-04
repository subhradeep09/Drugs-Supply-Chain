'use client';

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  orderId: string;
  hospitalName?: string;
  quantity: number;
  medicineName: string;
  manufacturerStatus: string;
  deliveryDate: string;
  orderDate: string;
}

export default function InvoiceGeneratorPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveredOrders = async () => {
    try {
      const res = await fetch('/api/vendor-request-delivery');
      const data = await res.json();
      const delivered = data.filter((order: Order) => order.manufacturerStatus === 'Delivered');
      setOrders(delivered.reverse());
    } catch (err) {
      console.error('Failed to fetch delivered orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (order: Order) => {
    try {
      const res = await fetch('/api/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${order.orderId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert(await res.text() || 'Failed to generate invoice');
      }
    } catch (err) {
      console.error('Invoice download failed:', err);
      alert('Error generating invoice');
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Delivered Orders - Invoice Generator</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No delivered orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-blue-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Hospital</th>
                <th className="px-4 py-3">Medicine</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Delivery Date</th>
                <th className="px-4 py-3 text-center">Invoice</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {orders.map((order) => (
                <tr key={order._id} className="border-t even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">{order.hospitalName || '-'}</td>
                  <td className="px-4 py-3">{order.medicineName}</td>
                  <td className="px-4 py-3">{order.quantity}</td>
                  <td className="px-4 py-3">{order.deliveryDate?.slice(0, 10) || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow"
                    >
                      Download Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
