'use client';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchDrugs = async () => {
      const res = await fetch('/api/hospital-dispense');
      const data = await res.json();
      setDrugs(data);
    };
    fetchDrugs();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/hospital-dispense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugId: selected, quantity, recipient })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setMessage(result.message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dispense Drugs</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <select className="input" onChange={e => setSelected(e.target.value)} value={selected}>
          <option value="">Select Drug</option>
          {drugs.map(d => (
            <option key={d.medicineName} value={d.medicineName}>
              {d.medicineName} (Stock: {d.totalDelivered})
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          min={1}
          required
        />
        <input
          type="text"
          className="input"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Recipient"
          required
        />
        <button className="btn-primary">Dispense</button>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>

      <h2 className="text-lg font-semibold">Available Medicines</h2>
      <ul className="list-disc pl-6 mt-2">
        {drugs.map(d => (
          <li key={d._id}>
            {d.medicineName} – {d.totalDelivered} units
          </li>
        ))}
      </ul>

      <style jsx>{`
        .input {
          @apply w-full border rounded px-3 py-2;
        }
        .btn-primary {
          @apply bg-blue-600 text-white px-4 py-2 rounded;
        }
      `}</style>
    </div>
  );
}
