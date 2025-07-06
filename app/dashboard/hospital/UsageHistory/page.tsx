'use client';

import { useEffect, useState } from 'react';

interface DispenseLog {
  _id: string;
  quantity: number;
  dispensedAt: string;
  recipient: string;
  medicineId: {
    brandName: string;
    genericName?: string;
  };
}

export default function DispenseLogsPage() {
  const [logs, setLogs] = useState<DispenseLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/hospital-dispense-logs');
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        console.error('Failed to fetch logs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧾 Dispense Logs</h1>

      {loading ? (
        <p className="text-gray-500">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-600">No dispense logs available.</p>
      ) : (
        <div className="grid gap-6">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-xl font-semibold text-gray-800">
                    {log.medicineId.brandName}
                    <span className="text-sm text-gray-500 ml-2">
                      ({log.medicineId.genericName || 'Generic'})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Recipient:{' '}
                    <span className="font-medium">{log.recipient}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Dispensed on:{' '}
                    {new Date(log.dispensedAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base text-gray-600">Total</span>
                  <div className="text-2xl font-bold text-blue-700">
                    {log.quantity} <span className="text-sm text-gray-500">units</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
