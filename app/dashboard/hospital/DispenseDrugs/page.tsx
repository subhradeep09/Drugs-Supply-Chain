'use client';
import React, { useEffect, useState } from 'react';

interface Drug {
  _id: string;
  medicineName: string;
  totalDelivered: number;
}

export default function DispenseDrugsPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchDrugs = async () => {
    try {
      const res = await fetch('/api/hospital-inventory');
      const data = await res.json();
      setDrugs(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load inventory.');
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleDispense = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selected || !recipient || quantity < 1) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const res = await fetch('/api/hospital-dispense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugId: selected, quantity, recipient }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setMessage(result.message || 'Dispensed successfully.');
      setSelected('');
      setQuantity(1);
      setRecipient('');
      fetchDrugs();
    } catch (err: any) {
      setError(err.message || 'Dispense failed.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dispense Drugs</h1>

      <form onSubmit={handleDispense} className="bg-white rounded shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="input" value={selected} onChange={e => setSelected(e.target.value)} required>
            <option value="">Select Drug</option>
            {drugs.map(d => (
              <option key={d._id} value={d._id}>
                {d.medicineName} (Stock: {d.totalDelivered})
              </option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            min={1}
            max={selected ? drugs.find(d => d._id === selected)?.totalDelivered || 1 : 1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            required
          />

          <input
            className="input"
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder="Recipient"
            required
          />
        </div>

        <button className="btn-primary" type="submit">
          Dispense
        </button>

        {message && <div className="mt-4 text-green-600">{message}</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}
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
              <tr key={d._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.medicineName}</td>
                <td className="p-3">{d.totalDelivered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .input {
          @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400;
        }
        .btn-primary {
          @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition;
        }
      `}</style>
    </div>
  );
}
