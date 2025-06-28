'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function OrderPage() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [hospitalName, setHospitalName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/medicines/public')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        setIsLoading(false);
      });
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    `${medicine.brandName} ${medicine.genericName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePlaceOrder = async () => {
    if ( !deliveryDate) {
      alert('Please enter delivery date.');
      return;
    }

    const orderData = {
      orderId: uuidv4(),
      medicineId: selectedMedicine._id,
      medicineName: selectedMedicine.brandName,
      quantity,
      price: selectedMedicine.offerPrice,
      totalValue: selectedMedicine.offerPrice * quantity,
      deliveryDate,
      orderDate: new Date().toISOString(),
      manufacturerStatus: 'Pending',
    };

    try {
      setIsLoading(true);
      await fetch('/api/orderh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      alert('Order placed successfully!');
      setSelectedMedicine(null);
      setHospitalName('');
      setDeliveryDate('');
      setQuantity(1);
    } catch (error) {
      alert('Error placing order.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          'linear-gradient(rgb(222, 243, 248) 50%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Order Medicines
        </h1>

        {/* 🔍 Search Bar */}
        <div className="mb-6 max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search medicine by name..."
            className="w-full px-4 py-3 text-sm rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white rounded-xl shadow p-4 transform transition duration-300 hover:scale-[1.03] hover:shadow-xl animate-fadeIn"
            >
              <img
                src={medicine.productImage || '/placeholder-medicine.jpg'}
                alt={medicine.brandName}
                className="w-full h-36 object-contain bg-gray-100 mb-3 rounded"
              />
              <h2 className="text-md font-semibold">{medicine.brandName}</h2>
              <p className="text-sm text-gray-500">{medicine.genericName}</p>
              <p className="text-sm text-gray-500">MRP: ₹{medicine.mrp}</p>
              <p className="text-green-600 font-semibold">
                Offer: ₹{medicine.offerPrice}
              </p>
              <p className="text-xs text-green-700 mb-2">
                Save ₹{medicine.mrp - medicine.offerPrice} (
                {Math.round(
                  ((medicine.mrp - medicine.offerPrice) / medicine.mrp) * 100
                )}
                % OFF)
              </p>
              <button
                onClick={() => {
                  setSelectedMedicine(medicine);
                  setHospitalName('');
                  setDeliveryDate('');
                  setQuantity(1);
                }}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl relative overflow-y-auto max-h-[90vh] animate-zoomIn">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="absolute top-4 right-5 text-gray-400 hover:text-black text-3xl font-bold focus:outline-none"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-8 mt-4">
              <div className="flex-shrink-0 w-full md:w-72">
                <img
                  src={
                    selectedMedicine.productImage ||
                    '/placeholder-medicine.jpg'
                  }
                  alt={selectedMedicine.brandName}
                  className="w-full h-72 object-contain rounded-xl bg-gray-100 border"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedMedicine.brandName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Generic Name:</strong>{' '}
                    {selectedMedicine.genericName}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedMedicine.category}
                  </p>
                  <p>
                    <strong>{selectedMedicine.shortDescription}</strong>
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {selectedMedicine.detailedDescription}
                  </p>
                  <p>
                    <strong>Dosage Form:</strong>{' '}
                    {selectedMedicine.dosageForm}
                  </p>
                  <p>
                    <strong>Strength:</strong> {selectedMedicine.strength}
                  </p>
                  <p>
                    <strong>Pack Size:</strong> {selectedMedicine.packSize}
                  </p>
                  <p>
                    <strong>License No:</strong>{' '}
                    {selectedMedicine.licenseNumber}
                  </p>
                  <p>
                    <strong>Batch No:</strong>{' '}
                    {selectedMedicine.batchNumber}
                  </p>
                  <p>
                    <strong>Manufacture Date:</strong>{' '}
                    {selectedMedicine.manufacturingDate?.slice(0, 10)}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong>{' '}
                    {selectedMedicine.expiryDate?.slice(0, 10)}
                  </p>
                  <p>
                    <strong>Storage Conditions:</strong>{' '}
                    {selectedMedicine.storageConditions}
                  </p>
                  <p>
                    <strong>Available Stock:</strong>{' '}
                    {selectedMedicine.stockQuantity}
                  </p>
                </div>

                <div className="mt-6 border-t pt-4">
                  <p className="text-lg">
                    <strong>MRP:</strong> ₹{selectedMedicine.mrp}
                  </p>
                  <p className="text-lg text-green-600 font-medium">
                    <strong>Offer:</strong> ₹{selectedMedicine.offerPrice}
                  </p>
                  <p className="text-sm text-green-700">
                    Save ₹
                    {selectedMedicine.mrp - selectedMedicine.offerPrice} (
                    {Math.round(
                      ((selectedMedicine.mrp -
                        selectedMedicine.offerPrice) /
                        selectedMedicine.mrp) *
                        100
                    )}
                    % OFF)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Place Your Order
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value) || 1)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-lg transition-all duration-300 hover:scale-105"
              >
                🛒 Confirm & Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✨ Custom Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
