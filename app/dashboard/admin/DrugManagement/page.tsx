'use client';
import React, { useEffect, useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const API_URL = '/api/drugs';

interface Drug {
  _id?: string;
  brandName: string;
  genericName: string;
  category: string;
  dosageForm: string;
  strength: string;
  batchNumber: string;
  expiryDate: string;
  stockQuantity: number;
  mrp: number;
}

interface InventoryBadgeProps {
  stockQuantity: number;
  expiryDate: string;
}

function InventoryBadge({ stockQuantity, expiryDate }: InventoryBadgeProps) {
  const isLowStock = stockQuantity < 100;
  const isExpired = new Date(expiryDate) < new Date();
  if (isExpired)
    return (
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs flex items-center gap-1">
        <ExclamationTriangleIcon className="w-4 h-4" /> Expired
      </span>
    );
  if (isLowStock)
    return (
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs flex items-center gap-1">
        <ExclamationTriangleIcon className="w-4 h-4" /> Low Stock
      </span>
    );
  return (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1">
      <CheckCircleIcon className="w-4 h-4" /> In Stock
    </span>
  );
}

interface DrugFormProps {
  initial?: Drug | null;
  onSave: (form: Drug) => Promise<void>;
  onCancel: () => void;
}

function DrugForm({ initial, onSave, onCancel }: DrugFormProps) {
  const [form, setForm] = useState<Drug>(
    initial || {
      brandName: '',
      genericName: '',
      category: '',
      dosageForm: '',
      strength: '',
      batchNumber: '',
      expiryDate: '',
      stockQuantity: 0,
      mrp: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'stockQuantity' || name === 'mrp' ? Number(value) : value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="brandName" value={form.brandName} onChange={handleChange} placeholder="Brand Name" className="input" required />
        <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="Generic Name" className="input" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" required />
        <input name="dosageForm" value={form.dosageForm} onChange={handleChange} placeholder="Dosage Form" className="input" required />
        <input name="strength" value={form.strength} onChange={handleChange} placeholder="Strength" className="input" required />
        <input name="batchNumber" value={form.batchNumber} onChange={handleChange} placeholder="Batch Number" className="input" required />
        <input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="input" required />
        <input name="stockQuantity" value={form.stockQuantity} onChange={handleChange} type="number" min={0} placeholder="Stock Quantity" className="input" required />
        <input name="mrp" value={form.mrp} onChange={handleChange} type="number" min={0} step="0.01" placeholder="MRP" className="input" required />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export default function DrugManagementPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editDrug, setEditDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchDrugs = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=10`);
    const data = await res.json();
    setDrugs(data.drugs);
    setTotalPages(data.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => { fetchDrugs(); }, [search, page]);

  const handleSave = async (form: Drug) => {
    if (editDrug && editDrug._id) {
      await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editDrug._id }),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    setEditDrug(null);
    fetchDrugs();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchDrugs();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Drug Management</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => { setShowForm(true); setEditDrug(null); }}>
          <PlusIcon className="w-5 h-5" /> Add Drug
        </button>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          className="input w-full max-w-xs"
          placeholder="Search by name or generic..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Brand Name</th>
              <th className="p-3 text-left">Generic Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Dosage</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">MRP</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="text-center p-6">Loading...</td></tr>
            ) : drugs.length === 0 ? (
              <tr><td colSpan={10} className="text-center p-6">No drugs found.</td></tr>
            ) : drugs.map(drug => (
              <tr key={drug._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{drug.brandName}</td>
                <td className="p-3">{drug.genericName}</td>
                <td className="p-3">{drug.category}</td>
                <td className="p-3">{drug.strength} {drug.dosageForm}</td>
                <td className="p-3">{drug.batchNumber}</td>
                <td className="p-3">{drug.expiryDate ? new Date(drug.expiryDate).toLocaleDateString() : '-'}</td>
                <td className="p-3">{drug.stockQuantity}</td>
                <td className="p-3">₹{drug.mrp}</td>
                <td className="p-3"><InventoryBadge stockQuantity={drug.stockQuantity} expiryDate={drug.expiryDate} /></td>
                <td className="p-3 flex gap-2">
                  <button className="btn-icon" onClick={() => { setEditDrug(drug); setShowForm(true); }}><PencilIcon className="w-5 h-5" /></button>
                  <button className="btn-icon text-red-600" onClick={() => setDeleteId(drug._id || '')}><TrashIcon className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button className="btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <button className="btn-secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{editDrug ? 'Edit Drug' : 'Add Drug'}</h2>
            <DrugForm
              initial={editDrug}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditDrug(null); }}
            />
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-red-600">Delete Drug</h2>
            <p>Are you sure you want to delete this drug?</p>
            <div className="flex gap-2 justify-end mt-6">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .input { @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400; }
        .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition; }
        .btn-secondary { @apply bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition; }
        .btn-danger { @apply bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition; }
        .btn-icon { @apply p-2 rounded hover:bg-gray-100 transition; }
      `}</style>
    </div>
  );
} 