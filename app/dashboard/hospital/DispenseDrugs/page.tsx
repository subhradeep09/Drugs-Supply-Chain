'use client';
import React, { useState } from 'react';

const mockDrugs = [
  { id: '1', name: 'Paracetamol 500mg', stock: 500 },
  { id: '2', name: 'Amoxicillin 250mg', stock: 300 },
  { id: '3', name: 'Ibuprofen 400mg', stock: 400 },
];

export default function DispenseDrugsPage() {
  const [drugs, setDrugs] = useState(mockDrugs);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleDispense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !recipient || quantity < 1) {
      setMessage('Please fill all fields.');
      return;
    }
    setDrugs((prev) =>
      prev.map((d) =>
        d.id === selected
          ? { ...d, stock: d.stock - quantity }
          : d
      )
    );
    setMessage(`Dispensed ${quantity} of ${drugs.find(d => d.id === selected)?.name} to ${recipient}.`);
    setSelected('');
    setQuantity(1);
    setRecipient('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dispense Drugs</h1>
      <form onSubmit={handleDispense} className="bg-white rounded shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="input" value={selected} onChange={e => setSelected(e.target.value)} required>
            <option value="">Select Drug</option>
            {drugs.map(d => (
              <option key={d.id} value={d.id}>{d.name} (Stock: {d.stock})</option>
            ))}
          </select>
          <input className="input" type="number" min={1} max={selected ? drugs.find(d => d.id === selected)?.stock : 1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Quantity" required />
          <input className="input" type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient" required />
        </div>
        <button className="btn-primary" type="submit">Dispense</button>
        {message && <div className="mt-4 text-green-600">{message}</div>}
      </form>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Drug</th>
              <th className="p-3 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map(d => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.stock}</td>
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