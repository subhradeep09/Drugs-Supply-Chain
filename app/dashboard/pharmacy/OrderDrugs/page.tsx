'use client';
import React, { useState } from 'react';

const mockDrugs = [
  { id: '1', name: 'Paracetamol 500mg', available: 500 },
  { id: '2', name: 'Amoxicillin 250mg', available: 300 },
  { id: '3', name: 'Ibuprofen 400mg', available: 400 },
];

export default function OrderDrugsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [info, setInfo] = useState('');

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || quantity < 1) {
      setInfo('Please select a drug and quantity.');
      return;
    }
    setOrders([
      { drug: mockDrugs.find(d => d.id === selected)?.name || '', quantity, date: new Date().toISOString().slice(0, 10), status: 'Pending' },
      ...orders,
    ]);
    setSelected('');
    setQuantity(1);
    setInfo('Order placed!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Drugs</h1>
      <form onSubmit={handleOrder} className="bg-white rounded shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select className="input" value={selected} onChange={e => setSelected(e.target.value)} required>
            <option value="">Select Drug</option>
            {mockDrugs.map(d => (
              <option key={d.id} value={d.id}>{d.name} (Available: {d.available})</option>
            ))}
          </select>
          <input className="input" type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Quantity" required />
        </div>
        <button className="btn-primary" type="submit">Order</button>
        {info && <div className="mt-4 text-green-600">{info}</div>}
      </form>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No orders placed.</td></tr>
            ) : orders.map((o, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.drug}</td>
                <td className="p-3">{o.quantity}</td>
                <td className="p-3">{o.date}</td>
                <td className="p-3">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
      `}</style>
    </div>
  );
}