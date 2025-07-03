'use client';

import { useState } from 'react';

export default function AddMedicinePage() {
  const [form, setForm] = useState({
    brandName: '',
    genericName: '',
    category: '',
    dosageForm: '',
    strength: '',
    packSize: '',
    licenseNumber: '',
    approvalNumber: '',
    mrp: '',
    gst: '',
    minOrderQuantity: '',
    shortDescription: '',
    detailedDescription: '',
    productImage: '',
    packagingImage: '',
    labReports: '',
    storageConditions: '',
    shippingWeight: '',
    dimensions: '',
    brochure: '',
    msds: '',
    certifications: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/vendor-medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('✅ Medicine added successfully!');
        setForm({
          brandName: '',
          genericName: '',
          category: '',
          dosageForm: '',
          strength: '',
          packSize: '',
          licenseNumber: '',
          approvalNumber: '',
          mrp: '',
          gst: '',
          minOrderQuantity: '',
          shortDescription: '',
          detailedDescription: '',
          productImage: '',
          packagingImage: '',
          labReports: '',
          storageConditions: '',
          shippingWeight: '',
          dimensions: '',
          brochure: '',
          msds: '',
          certifications: '',
        });
      } else {
        const data = await res.json();
        alert(`❌ Failed to add: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl mb-6 font-bold text-blue-700">➕ Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section: Basic Info */}
        <div className="col-span-2 text-xl font-semibold">🧪 Basic Medicine Information</div>
        <input name="brandName" value={form.brandName} onChange={handleChange} placeholder="Brand Name" className="border p-3 rounded" />
        <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="Generic Name" className="border p-3 rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-3 rounded" />

        {/* Section: Specifications */}
        <div className="col-span-2 text-xl font-semibold">📦 Product Specifications</div>
        <input name="dosageForm" value={form.dosageForm} onChange={handleChange} placeholder="Dosage Form" className="border p-3 rounded" />
        <input name="strength" value={form.strength} onChange={handleChange} placeholder="Strength" className="border p-3 rounded" />
        <input name="packSize" value={form.packSize} onChange={handleChange} placeholder="Pack Size" className="border p-3 rounded" />

        {/* Section: Compliance */}
        <div className="col-span-2 text-xl font-semibold">📄 Regulatory & Compliance</div>
        <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License Number" className="border p-3 rounded" />
        <input name="approvalNumber" value={form.approvalNumber} onChange={handleChange} placeholder="Approval Number" className="border p-3 rounded" />

        {/* Section: Pricing */}
        <div className="col-span-2 text-xl font-semibold">💰 Pricing</div>
        <input name="mrp" value={form.mrp} onChange={handleChange} placeholder="MRP" className="border p-3 rounded" />
        <input name="gst" value={form.gst} onChange={handleChange} placeholder="GST (%)" className="border p-3 rounded" />
        <input name="minOrderQuantity" value={form.minOrderQuantity} onChange={handleChange} placeholder="Minimum Order Quantity" className="border p-3 rounded" />

        {/* Section: Descriptions */}
        <div className="col-span-2 text-xl font-semibold">📝 Descriptions</div>
        <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="border p-3 rounded min-h-[60px]" />
        <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} placeholder="Detailed Description" className="border p-3 rounded min-h-[100px]" />

        {/* Section: Media */}
        <div className="col-span-2 text-xl font-semibold">🖼 Media & Documents</div>
        <input name="productImage" value={form.productImage} onChange={handleChange} placeholder="Product Image URL" className="border p-3 rounded" />
        <input name="packagingImage" value={form.packagingImage} onChange={handleChange} placeholder="Packaging Image URL" className="border p-3 rounded" />
        <input name="labReports" value={form.labReports} onChange={handleChange} placeholder="Lab Reports URL" className="border p-3 rounded" />

        {/* Section: Logistics */}
        <div className="col-span-2 text-xl font-semibold">🚚 Logistics & Packaging</div>
        <input name="storageConditions" value={form.storageConditions} onChange={handleChange} placeholder="Storage Conditions" className="border p-3 rounded" />
        <input name="shippingWeight" value={form.shippingWeight} onChange={handleChange} placeholder="Shipping Weight" className="border p-3 rounded" />
        <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="Dimensions" className="border p-3 rounded" />

        {/* Section: Attachments */}
        <div className="col-span-2 text-xl font-semibold">📎 Attachments</div>
        <input name="brochure" value={form.brochure} onChange={handleChange} placeholder="Brochure URL" className="border p-3 rounded" />
        <input name="msds" value={form.msds} onChange={handleChange} placeholder="MSDS Document URL" className="border p-3 rounded" />
        <input name="certifications" value={form.certifications} onChange={handleChange} placeholder="Certifications" className="border p-3 rounded" />

        {/* Submit */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 w-full text-lg font-semibold"
          >
            {loading ? 'Adding Medicine...' : '➕ Add Medicine'}
          </button>
        </div>
      </form>
    </div>
  );
}
