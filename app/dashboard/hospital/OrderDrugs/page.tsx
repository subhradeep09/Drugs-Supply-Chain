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

  useEffect(() => {
    fetch('/api/medicines')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        setIsLoading(false);
      });
  }, []);

  const handlePlaceOrder = async () => {
    if (!hospitalName || !deliveryDate) {
      alert('Please enter hospital name and delivery date.');
      return;
    }

    const orderData = {
      orderId: uuidv4(),
      medicineId: selectedMedicine._id,
      medicineName: selectedMedicine.brandName,
      quantity,
      price: selectedMedicine.offerPrice,
      hospitalName,
      totalValue: selectedMedicine.offerPrice * quantity,
      deliveryDate,
      orderDate: new Date().toISOString(),
      manufacturerStatus: "Pending"
    };

    try {
      setIsLoading(true);
      await fetch('/api/orderh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Medicines</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <div key={medicine._id} className="bg-white rounded-lg shadow p-4">
              <img 
                src={medicine.productImage || '/placeholder-medicine.jpg'} 
                alt={medicine.brandName} 
                className="w-full h-40 object-contain bg-gray-100 mb-4"
              />
              <h2 className="text-md font-bold">{medicine.brandName}</h2>
              <p className="text-sm text-gray-500">{medicine.genericName}</p>
              <p className="text-sm text-gray-500">MRP: ₹{medicine.mrp}</p>
              <p className="text-green-600 font-semibold">Offer: ₹{medicine.offerPrice}</p>
              <p className="text-sm text-green-700 mb-4">
                Save ₹{medicine.mrp - medicine.offerPrice} ({Math.round(((medicine.mrp - medicine.offerPrice) / medicine.mrp) * 100)}% OFF)
              </p>
              <button
                onClick={() => {
                  setSelectedMedicine(medicine);
                  setHospitalName('');
                  setDeliveryDate('');
                  setQuantity(1);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedMedicine && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl relative">
      <button
        onClick={() => setSelectedMedicine(null)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
      >
        ×
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        <div className="flex-shrink-0">
          <img
            src={selectedMedicine.productImage || '/placeholder-medicine.jpg'}
            alt={selectedMedicine.brandName}
            className="w-72 h-72 object-contain rounded-xl bg-gray-100 border"
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedMedicine.brandName}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Generic Name:</span> {selectedMedicine.genericName}</p>
            <p><span className="font-semibold">Category:</span> {selectedMedicine.category}</p>
            <p><span className="font-semibold">Dosage Form:</span> {selectedMedicine.dosageForm}</p>
            <p><span className="font-semibold">Strength:</span> {selectedMedicine.strength}</p>
            <p><span className="font-semibold">Pack Size:</span> {selectedMedicine.packSize}</p>
            <p><span className="font-semibold">License No:</span> {selectedMedicine.licenseNumber}</p>
            <p><span className="font-semibold">Batch No:</span> {selectedMedicine.batchNumber}</p>
            <p><span className="font-semibold">Mfg Date:</span> {selectedMedicine.manufacturingDate?.slice(0,10)}</p>
            <p><span className="font-semibold">Expiry Date:</span> {selectedMedicine.expiryDate?.slice(0,10)}</p>
            <p><span className="font-semibold">Storage:</span> {selectedMedicine.storageConditions}</p>
            <p><span className="font-semibold">Stock:</span> {selectedMedicine.stockQuantity}</p>
          </div>

          <div className="mt-4">
            <p className="text-lg"><span className="font-semibold">MRP:</span> ₹{selectedMedicine.mrp}</p>
            <p className="text-lg text-green-600"><span className="font-semibold">Offer:</span> ₹{selectedMedicine.offerPrice}</p>
            <p className="text-sm text-green-700">
              Save ₹{selectedMedicine.mrp - selectedMedicine.offerPrice} ({Math.round(((selectedMedicine.mrp - selectedMedicine.offerPrice) / selectedMedicine.mrp) * 100)}% OFF)
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Hospital Name:</label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Delivery Date:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>

      )}
    </div>
  );
}
