'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';

export default function VendorUpdateStockPage() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    medicineId: '',
    batchNumber: '',
    expiryDate: '',
    manufacturingDate: '',
    stockQuantity: '',
    mrp: '',
    offerPrice: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch medicines added by this vendor
    fetch('/api/vendor-medicines')
      .then(res => res.json())
      .then(data => setMedicines(data))
      .catch(() => setMessage('❌ Failed to load medicines.'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/vendor-update-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          stockQuantity: parseInt(form.stockQuantity),
          mrp: parseFloat(form.mrp),
          offerPrice: parseFloat(form.offerPrice || form.mrp),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Stock updated successfully!');
        setForm({
          medicineId: '',
          batchNumber: '',
          expiryDate: '',
          manufacturingDate: '',
          stockQuantity: '',
          mrp: '',
          offerPrice: '',
        });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📦 Update Medicine Stock</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Medicine */}
        <div>
          <label className="block font-semibold mb-1">Select Medicine</label>
          <select
            name="medicineId"
            value={form.medicineId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select --</option>
            {medicines.map((med: any) => (
              <option key={med._id} value={med._id}>
                {med.brandName} ({med.genericName})
              </option>
            ))}
          </select>
        </div>

        {/* Batch Number */}
        <div>
          <label className="block font-semibold mb-1">Batch Number</label>
          <Input
            name="batchNumber"
            value={form.batchNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block font-semibold mb-1">Expiry Date</label>
          <Input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Manufacturing Date */}
        <div>
          <label className="block font-semibold mb-1">Manufacturing Date</label>
          <Input
            type="date"
            name="manufacturingDate"
            value={form.manufacturingDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block font-semibold mb-1">Stock Quantity</label>
          <Input
            type="number"
            name="stockQuantity"
            value={form.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Mrp</label>
          <Input
            type="number"
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
            required
          />
        </div>

        {/* Offer Price */}
        <div>
          <label className="block font-semibold mb-1">Offer Price (optional)</label>
          <Input
            type="number"
            name="offerPrice"
            value={form.offerPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : '✅ Submit'}
          </Button>
        </div>

        {message && <p className="mt-4 text-sm font-medium">{message}</p>}
      </form>
    </div>
  );
}
