'use client';
import React, { useEffect, useState } from 'react';

export default function NewUserRequestsPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchPending = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/pending-users');
      const data = await res.json();
      setPending(data.users);
    } catch (err) {
      setError('Failed to fetch requests');
    }
    setLoading(false);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (userId: string, action: 'APPROVE' | 'REJECT') => {
    setActionLoading(userId + action);
    await fetch('/api/admin/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action }),
    });
    setActionLoading(null);
    fetchPending();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Incoming Verification Requests</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : pending.length === 0 ? (
        <div>No pending verification requests.</div>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Organization</th>
                <th className="p-3 text-left">License</th>
                <th className="p-3 text-left">Submitted At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.verificationDetails?.organization || '-'}</td>
                  <td className="p-3">{user.verificationDetails?.licenseNumber || '-'}</td>
                  <td className="p-3">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                  <td className="p-3 flex gap-2">
                    <button className="btn-primary" disabled={actionLoading === user._id + 'APPROVE'} onClick={() => handleAction(user._id, 'APPROVE')}>Accept</button>
                    <button className="btn-danger" disabled={actionLoading === user._id + 'REJECT'} onClick={() => handleAction(user._id, 'REJECT')}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style jsx>{`
        .btn-primary { @apply bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition; }
        .btn-danger { @apply bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition; }
      `}</style>
    </div>
  );
}