'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface PODType {
  _id: string;
  orderId: string;
  hospitalName: string;
  vendorId: string;
  podUrl: string;
  uploadedAt: string; // ISO string from MongoDB
}

export default function ManufacturerView() {
  const [pods, setPods] = useState<PODType[]>([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(new Date());

  const fetchPods = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/get_pods');
      setPods(res.data);
    } catch (err) {
      console.error('Failed to fetch PODs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPods();
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30000); // Update every 30s
    return () => clearInterval(timer);
  }, []);

  const getRelativeTime = (uploadedAt: string) => {
    const uploadedDate = new Date(uploadedAt);
    const diff = Math.floor((now.getTime() - uploadedDate.getTime()) / 1000); // in seconds

    let relative = '';
    if (diff < 10) relative = 'Just now';
    else if (diff < 60) relative = `${diff}s ago`;
    else if (diff < 3600) relative = `${Math.floor(diff / 60)}m ago`;
    else if (diff < 86400) relative = `${Math.floor(diff / 3600)}h ago`;
    else relative = uploadedDate.toLocaleDateString();

    const fullDateTime = uploadedDate.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { relative, fullDateTime };
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            📦 Manufacturer: POD Receipts
          </h2>
          <button
            onClick={fetchPods}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:bg-blue-300"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>

        {pods.length === 0 ? (
          <p className="text-gray-600">No PODs available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Hospital</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Vendor</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Uploaded</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">POD File</th>
                </tr>
              </thead>
              <tbody>
                {pods.map((pod) => {
                  const { relative, fullDateTime } = getRelativeTime(pod.uploadedAt);
                  return (
                    <tr key={pod._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border-b">{pod.orderId}</td>
                      <td className="px-4 py-2 border-b">{pod.hospitalName}</td>
                      <td className="px-4 py-2 border-b">{pod.vendorId}</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-600">
                        <div>{relative}</div>
                        <div className="text-xs text-gray-500">{fullDateTime}</div>
                      </td>
                      <td className="px-4 py-2 border-b">
                        <a
                          href={pod.podUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          📄 View PDF
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}