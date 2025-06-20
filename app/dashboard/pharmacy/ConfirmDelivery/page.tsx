'use client';
import React, { useState } from 'react';

const mockDeliveries = [
  { orderId: 'PORD001', drug: 'Paracetamol 500mg', quantity: 60, status: 'Pending' },
  { orderId: 'PORD002', drug: 'Amoxicillin 250mg', quantity: 30, status: 'Pending' },
  { orderId: 'PORD003', drug: 'Ibuprofen 400mg', quantity: 45, status: 'Pending' },
];

export default function ConfirmDeliveryPage() {
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const handleConfirm = (orderId: string) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.orderId === orderId ? { ...d, status: 'Confirmed' } : d
      )
    );
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Confirm Delivery</h1>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-6">No pending deliveries.</td></tr>
            ) : deliveries.map((d) => (
              <tr key={d.orderId} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.orderId}</td>
                <td className="p-3">{d.drug}</td>
                <td className="p-3">{d.quantity}</td>
                <td className="p-3">{d.status}</td>
                <td className="p-3">
                  {d.status === 'Pending' ? (
                    <button className="btn-primary" onClick={() => handleConfirm(d.orderId)}>
                      Confirm
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
      `}</style>
    </div>
  );
} 