'use client';
import React, { useState } from 'react';

const mockLogs = [
  { timestamp: '2024-06-01 10:00', event: 'DrugDispatched', txHash: '0xabc123...', status: 'Success' },
  { timestamp: '2024-06-01 12:30', event: 'DrugReceived', txHash: '0xdef456...', status: 'Success' },
  { timestamp: '2024-06-02 09:15', event: 'OrderCreated', txHash: '0x789abc...', status: 'Success' },
  { timestamp: '2024-06-02 14:20', event: 'DrugExpired', txHash: '0x456def...', status: 'Warning' },
];

export default function SmartContractLogsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockLogs.filter(
    (log) =>
      log.event.toLowerCase().includes(search.toLowerCase()) ||
      log.txHash.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Smart Contract Logs</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by event or tx hash..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Tx Hash</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6">No logs found.</td></tr>
            ) : filtered.map((log, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{log.timestamp}</td>
                <td className="p-3">{log.event}</td>
                <td className="p-3 font-mono">{log.txHash}</td>
                <td className="p-3">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
      `}</style>
    </div>
  );
} 