'use client';

import { useState } from 'react';

export default function AddMedicinePage() {
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    mfgDate: '',
    expDate: '',
    quantity: '',
    price: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Add New Medicine</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium">Medicine Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="font-medium">Batch Number</label>
            <input type="text" name="batch" value={formData.batch} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Manufacturing Date</label>
              <input type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-medium">Expiry Date</label>
              <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-medium">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>

          {submitted && (
            <div className="text-green-600 font-semibold text-center">
              ✅ Medicine added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
