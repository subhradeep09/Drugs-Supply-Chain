'use client';

import { useEffect, useState } from 'react';

interface ExpiredBatch {
  orderId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  deliveryDate: string;
}

export default function ExpiryLogsPage() {
  const [logs, setLogs] = useState<ExpiredBatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hospital-expiry-logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch expiry logs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Expired Medicine Logs (Last 6 Months)</h1>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No expired medicines in the last 6 months.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Medicine</th>
                <th className="px-4 py-2 text-left">Batch Number</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Expiry Date</th>
                <th className="px-4 py-2 text-left">Delivered On</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-xs">{log.orderId}</td>
                  <td className="px-4 py-2">{log.medicineName}</td>
                  <td className="px-4 py-2">{log.batchNumber}</td>
                  <td className="px-4 py-2">{log.quantity}</td>
                  <td className="px-4 py-2 text-red-600">{log.expiryDate}</td>
                  <td className="px-4 py-2">{log.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
