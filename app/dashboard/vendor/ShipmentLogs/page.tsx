'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Medicine {
  _id: string;
  brandName: string;
  genericName: string;
  category: string;
  dosageForm: string;
  strength: string;
  packSize: string;
  offerPrice: number;
  mrp: number;
  stockQuantity: number;
  productImage: string;
}

export default function ViewVendorMedicines() {
  const { data: session, status } = useSession();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendorMedicines = async () => {
      try {
        const res = await fetch('/api/vendor-medicines'); // ✅ Updated API path
        if (!res.ok) throw new Error('Failed to fetch vendor medicines');
        const data = await res.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching vendor medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchVendorMedicines();
    }
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-b-2"></div>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl font-medium">
        You haven't added any medicines yet.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Your Added Medicines</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={medicine.productImage || '/placeholder-medicine.jpg'}
              alt={medicine.brandName}
              className="w-full h-40 object-contain bg-gray-100 rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{medicine.brandName}</h2>
            <p className="text-sm text-gray-600">{medicine.genericName}</p>
            <p className="text-sm">Category: {medicine.category}</p>
            <p className="text-sm">Dosage: {medicine.dosageForm}</p>
            <p className="text-sm">Strength: {medicine.strength}</p>
            <p className="text-sm">Pack Size: {medicine.packSize}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-600 line-through">MRP: ₹{medicine.mrp}</p>
              <p className="text-green-600 font-bold">Offer: ₹{medicine.offerPrice}</p>
            </div>
            <p className="text-sm mt-1">Stock: {medicine.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
