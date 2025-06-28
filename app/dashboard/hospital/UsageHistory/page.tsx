'use client';

import { useEffect, useState } from 'react';

interface DispenseRecord {
  _id: string;
  medicineName: string;
  quantity: number;
  recipient: string;
  date: string;
}

export default function UsagePage() {
  const [records, setRecords] = useState<DispenseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hospital-dispense-history')
      .then(res => res.json())
      .then(data => {
        setRecords(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch history:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dispense History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500">No dispense records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Medicine</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Recipient</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{r.medicineName}</td>
                  <td className="py-2 px-4">{r.quantity}</td>
                  <td className="py-2 px-4">{r.recipient}</td>
                  <td className="py-2 px-4">{new Date(r.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
