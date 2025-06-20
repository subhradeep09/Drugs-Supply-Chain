'use client';
import { useState } from 'react';

export default function AddMedicine() {
  const [form, setForm] = useState({
    brandName: '',
    genericName: '',
    category: '',
    dosageForm: '',
    strength: '',
    packSize: '',
    licenseNumber: '',
    batchNumber: '',
    expiryDate: '',
    manufacturingDate: '',
    approvalNumber: '',
    mrp: '',
    offerPrice: '',
    gst: '',
    stockQuantity: '',
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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting form data:", form);
    const res = await fetch('/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert('Medicine Added Successfully!');
      setForm({
        brandName: '',
        genericName: '',
        category: '',
        dosageForm: '',
        strength: '',
        packSize: '',
        licenseNumber: '',
        batchNumber: '',
        expiryDate: '',
        manufacturingDate: '',
        approvalNumber: '',
        mrp: '',
        offerPrice: '',
        gst: '',
        stockQuantity: '',
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
      alert('Error adding medicine');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl mb-8 font-bold">Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Basic Medicine Information */}
        <div className="col-span-2 text-xl font-semibold">🧪 Basic Medicine Information</div>
        <input name="brandName" value={form.brandName} onChange={handleChange} placeholder="Brand Name" className="border p-3 rounded w-full" />
        <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="Generic Name" className="border p-3 rounded w-full" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-3 rounded w-full" />

        {/* Product Specifications */}
        <div className="col-span-2 text-xl font-semibold">📦 Product Specifications</div>
        <input name="dosageForm" value={form.dosageForm} onChange={handleChange} placeholder="Dosage Form" className="border p-3 rounded w-full" />
        <input name="strength" value={form.strength} onChange={handleChange} placeholder="Strength" className="border p-3 rounded w-full" />
        <input name="packSize" value={form.packSize} onChange={handleChange} placeholder="Pack Size" className="border p-3 rounded w-full" />

        {/* Regulatory & Compliance */}
        <div className="col-span-2 text-xl font-semibold">📜 Regulatory & Compliance</div>
        <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License Number" className="border p-3 rounded w-full" />
        <input name="batchNumber" value={form.batchNumber} onChange={handleChange} placeholder="Batch Number" className="border p-3 rounded w-full" />
        <input name="manufacturingDate" type="date" value={form.manufacturingDate} onChange={handleChange} className="border p-3 rounded w-full" />
        <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} className="border p-3 rounded w-full" />
        <input name="approvalNumber" value={form.approvalNumber} onChange={handleChange} placeholder="Approval Number" className="border p-3 rounded w-full" />

        {/* Pricing */}
        <div className="col-span-2 text-xl font-semibold">💰 Pricing</div>
        <input name="mrp" value={form.mrp} onChange={handleChange} placeholder="MRP" className="border p-3 rounded w-full" />
        <input name="offerPrice" value={form.offerPrice} onChange={handleChange} placeholder="Offer Price" className="border p-3 rounded w-full" />
        <input name="gst" value={form.gst} onChange={handleChange} placeholder="GST %" className="border p-3 rounded w-full" />

        {/* Inventory */}
        <div className="col-span-2 text-xl font-semibold">📦 Inventory</div>
        <input name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock Quantity" className="border p-3 rounded w-full" />
        <input name="minOrderQuantity" value={form.minOrderQuantity} onChange={handleChange} placeholder="Minimum Order Quantity" className="border p-3 rounded w-full" />

        {/* Descriptions */}
        <div className="col-span-2 text-xl font-semibold">📝 Descriptions</div>
        <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="border p-3 rounded w-full min-h-[80px]" />
        <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} placeholder="Detailed Description" className="border p-3 rounded w-full min-h-[120px]" />

        {/* Media & Documents */}
        <div className="col-span-2 text-xl font-semibold">🖼 Media & Documents</div>
        <input name="productImage" value={form.productImage} onChange={handleChange} placeholder="Product Image URL" className="border p-3 rounded w-full" />
        <input name="packagingImage" value={form.packagingImage} onChange={handleChange} placeholder="Packaging Image URL" className="border p-3 rounded w-full" />
        <input name="labReports" value={form.labReports} onChange={handleChange} placeholder="Lab Reports URL" className="border p-3 rounded w-full" />

        {/* Logistics */}
        <div className="col-span-2 text-xl font-semibold">🚚 Logistics & Packaging</div>
        <input name="storageConditions" value={form.storageConditions} onChange={handleChange} placeholder="Storage Conditions" className="border p-3 rounded w-full" />
        <input name="shippingWeight" value={form.shippingWeight} onChange={handleChange} placeholder="Shipping Weight" className="border p-3 rounded w-full" />
        <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="Dimensions" className="border p-3 rounded w-full" />

        {/* Attachments */}
        <div className="col-span-2 text-xl font-semibold">📎 Attachments</div>
        <input name="brochure" value={form.brochure} onChange={handleChange} placeholder="Brochure URL" className="border p-3 rounded w-full" />
        <input name="msds" value={form.msds} onChange={handleChange} placeholder="MSDS Document URL" className="border p-3 rounded w-full" />
        <input name="certifications" value={form.certifications} onChange={handleChange} placeholder="Certifications" className="border p-3 rounded w-full" />

        <div className="col-span-2">
          <button type="submit" className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 w-full text-lg font-semibold">
            ➕ Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
}
