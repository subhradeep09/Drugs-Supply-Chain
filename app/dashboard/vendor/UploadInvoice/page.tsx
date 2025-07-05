'use client';
import { useEffect, useState } from 'react';

interface Order {
  orderId: string;
  medicineName: string;
  hospitalName: string;
  quantity: number;
  manufacturerStatus: string;
}

interface Invoice {
  invoiceNumber: string;
  generatedAt: string;
  vendor: { name: string; email: string; address: string };
  order: {
    orderId: string;
    hospital: string;
    medicineName: string;
    quantity: number;
    pricePerUnit: number;
    total: number;
  };
}

export default function VendorInvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/vendor-invoice')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => setError('Failed to load orders.'));
  }, []);

  const handleGenerateInvoice = async (orderId: string) => {
    setError('');
    setInvoice(null);
    try {
      const res = await fetch(`/api/vendor-invoice/${orderId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInvoice(data);
    } catch (err: any) {
      setError(err.message || 'Error generating invoice.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Delivered Orders</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full table-auto border mb-8 bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Medicine</th>
            <th className="p-2 border">Hospital</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.orderId} className="border-b">
              <td className="p-2 border">{o.orderId}</td>
              <td className="p-2 border">{o.medicineName}</td>
              <td className="p-2 border">{o.hospitalName}</td>
              <td className="p-2 border">{o.quantity}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleGenerateInvoice(o.orderId)}
                  className="text-blue-600 hover:underline"
                >
                  Generate Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {invoice && (
        <div className="bg-white shadow rounded p-6 border">
          <h2 className="text-2xl font-semibold mb-2">Invoice: {invoice.invoiceNumber}</h2>
          <p><strong>Generated At:</strong> {invoice.generatedAt}</p>
          <p><strong>Vendor:</strong> {invoice.vendor.name}, {invoice.vendor.email}</p>
          <p><strong>Address:</strong> {invoice.vendor.address}</p>
          <hr className="my-4" />
          <p><strong>Order ID:</strong> {invoice.order.orderId}</p>
          <p><strong>Medicine:</strong> {invoice.order.medicineName}</p>
          <p><strong>Hospital:</strong> {invoice.order.hospital}</p>
          <p><strong>Quantity:</strong> {invoice.order.quantity}</p>
          <p><strong>Price/Unit:</strong> ₹{invoice.order.pricePerUnit.toFixed(2)}</p>
          <p><strong>Total:</strong> ₹{invoice.order.total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
