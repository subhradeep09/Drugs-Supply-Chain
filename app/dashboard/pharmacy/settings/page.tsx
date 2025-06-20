'use client';
import React, { useState } from 'react';

export default function SettingsPage() {
  const [email, setEmail] = useState('pharmacy@example.com');
  const [org, setOrg] = useState('City Pharmacy');
  const [info, setInfo] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setInfo('Settings saved!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSave} className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Organization</label>
          <input className="input" type="text" value={org} onChange={e => setOrg(e.target.value)} required />
        </div>
        <button className="btn-primary" type="submit">Save</button>
        {info && <div className="mt-4 text-green-600">{info}</div>}
      </form>
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
      `}</style>
    </div>
  );
}