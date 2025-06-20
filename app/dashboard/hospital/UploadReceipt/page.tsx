'use client';
import React, { useState } from 'react';

const mockReceipts = [
  { orderId: 'ORD001', file: 'receipt1.pdf', date: '2024-06-01' },
  { orderId: 'ORD002', file: 'receipt2.pdf', date: '2024-06-03' },
];

export default function UploadReceiptPage() {
  const [orderId, setOrderId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [receipts, setReceipts] = useState(mockReceipts);
  const [info, setInfo] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !file) {
      setInfo('Please select an order and a file.');
      return;
    }
    setReceipts([
      { orderId, file: file.name, date: new Date().toISOString().slice(0, 10) },
      ...receipts,
    ]);
    setOrderId('');
    setFile(null);
    setInfo('Receipt uploaded!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Receipt</h1>
      <form onSubmit={handleUpload} className="bg-white rounded shadow p-6 mb-8">
        <div className="mb-4">
          <input className="input" type="text" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" required />
        </div>
        <div className="mb-4">
          <input className="input" type="file" onChange={e => setFile(e.target.files?.[0] || null)} required />
        </div>
        <button className="btn-primary" type="submit">Upload</button>
        {info && <div className="mt-4 text-green-600">{info}</div>}
      </form>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length === 0 ? (
              <tr><td colSpan={3} className="text-center p-6">No receipts uploaded.</td></tr>
            ) : receipts.map((r, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{r.orderId}</td>
                <td className="p-3">{r.file}</td>
                <td className="p-3">{r.date}</td>
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