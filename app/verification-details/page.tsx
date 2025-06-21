'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = '/api/verification/details';

export default function VerificationDetailsPage() {
  const [status, setStatus] = useState<'FORM' | 'PENDING' | 'REJECTED' | 'APPROVED'>('FORM');
  const [details, setDetails] = useState<any>({ licenseNumber: '', organization: '' });
  const [role, setRole] = useState('HOSPITAL'); // In production, get from user session
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch current verification status
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.verificationStatus === 'PENDING') setStatus('PENDING');
        else if (data.verificationStatus === 'REJECTED') {
          setStatus('REJECTED');
          setRejectionReason(data.rejectionReason || '');
        }
        else if (data.isVerified) setStatus('APPROVED');
        else setStatus('FORM');
        if (data.verificationDetails) setDetails(data.verificationDetails);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...details, role }),
    });
    setStatus('PENDING');
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (status === 'PENDING') return <div className="p-8 text-center text-xl">Your account is under verifying.</div>;
  if (status === 'REJECTED') return <div className="p-8 text-center text-xl text-red-600">Your request is not approved.<br />Reason: {rejectionReason}</div>;
  if (status === 'APPROVED') {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">License Number</label>
          <input className="input" name="licenseNumber" value={details.licenseNumber} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Organization</label>
          <input className="input" name="organization" value={details.organization} onChange={handleChange} required />
        </div>
        {/* Add more fields based on role if needed */}
        <button className="btn-primary w-full" type="submit" disabled={loading}>Verify Account</button>
      </form>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
      `}</style>
    </div>
  );
} 