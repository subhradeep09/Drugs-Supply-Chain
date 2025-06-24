'use client';

import React, { useEffect, useState } from 'react';

interface Verification {
  _id: string;
  licenseNumber: string;
  organization: string;
  applicationStatus: string;
  submittedAt: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function NewApplicationsPage() {
  const [applications, setApplications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const fetchPendingApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/verification/pending?page=${page}&limit=5&search=${search}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingApplications();
  }, [page, search]);

  const handleAction = async (verificationId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch('/api/verification/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId, status }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Application ${status.toLowerCase()}!`);
        fetchPendingApplications();
      } else {
        alert('Operation failed');
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const totalPages = Math.ceil(total / 5);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Pending Applications</h1>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by License No. or Organization"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border p-2 w-1/2 rounded shadow"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center">No pending applications</div>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">License No</th>
                <th className="border p-3">Organization</th>
                <th className="border p-3">Submitted At</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td className="border p-3">{app.userId?.name || '-'}</td>
                  <td className="border p-3">{app.userId?.email || '-'}</td>
                  <td className="border p-3">{app.licenseNumber}</td>
                  <td className="border p-3">{app.organization}</td>
                  <td className="border p-3">{new Date(app.submittedAt).toLocaleString()}</td>
                  <td className="border p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(app._id, 'APPROVED')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(app._id, 'REJECTED')}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-5">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
