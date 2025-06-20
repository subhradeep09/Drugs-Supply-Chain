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
      await fetch('/api/orderp', {
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <div className="flex gap-6">
              <div>
                <img
                  src={selectedMedicine.productImage || '/placeholder-medicine.jpg'}
                  alt={selectedMedicine.brandName}
                  className="w-48 h-48 object-contain bg-gray-100"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedMedicine.brandName}</h2>
                <p><b>Generic Name:</b> {selectedMedicine.genericName}</p>
                <p><b>Category:</b> {selectedMedicine.category}</p>
                <p><b>Dosage Form:</b> {selectedMedicine.dosageForm}</p>
                <p><b>Strength:</b> {selectedMedicine.strength}</p>
                <p><b>Pack Size:</b> {selectedMedicine.packSize}</p>
                <p><b>License No:</b> {selectedMedicine.licenseNumber}</p>
                <p><b>Batch No:</b> {selectedMedicine.batchNumber}</p>
                <p><b>Expiry Date:</b> {selectedMedicine.expiryDate?.slice(0, 10)}</p>
                <p><b>Mfg Date:</b> {selectedMedicine.manufacturingDate?.slice(0, 10)}</p>
                <p><b>MRP:</b> ₹{selectedMedicine.mrp}</p>
                <p><b>Offer:</b> ₹{selectedMedicine.offerPrice}</p>
                <p><b>Stock:</b> {selectedMedicine.stockQuantity}</p>
                <p><b>Storage:</b> {selectedMedicine.storageConditions}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3">
                <label className="block mb-1 font-medium">Pharmacy Name:</label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Delivery Date:</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
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
