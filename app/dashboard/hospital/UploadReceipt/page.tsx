'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

interface OrderType {
  _id: string;
  orderId: string;
  hospitalName: string;
  manufacturerStatus: string;
  userId: {
    _id: string;
    name: string;
    organization: string;
  };
  medicineId: {
    brandName: string;
    strength: string;
  };
}

export default function UploadPOD() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get('/api/get_delivered_orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    }
    fetchOrders();
  }, []);

  const generatePDF = (order: OrderType) => {
    const doc = new jsPDF();
    doc.text(`POD for Order: ${order.orderId}`, 10, 10);
    doc.text(`Hospital: ${order.hospitalName}`, 10, 20);
    doc.text(`Medicine: ${order.medicineId.brandName} (${order.medicineId.strength})`, 10, 30);
    doc.text(`Delivered by: ${order.userId.organization}`, 10, 40);
    doc.text(`Status: ${order.manufacturerStatus}`, 10, 50);
    return doc.output('blob');
  };

  const handleUpload = async (order: OrderType) => {
    setUploading(true);
    try {
      const pdfBlob = generatePDF(order);
      const formData = new FormData();
      formData.append('file', pdfBlob, 'pod.pdf');
      formData.append('orderId', order.orderId);
      formData.append('hospitalUserId', order.userId._id);

      const res = await axios.post('/api/upload_pod', formData);
      console.log('Upload successful:', res.data);
      alert('POD uploaded successfully');
      setOrders(prev => prev.filter(o => o._id !== order._id));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload POD');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delivered Orders - Upload POD</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Medicine</th>
            <th className="border px-4 py-2">Hospital</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.medicineId.brandName} ({order.medicineId.strength})</td>
              <td className="border px-4 py-2">{order.hospitalName}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpload(order)}
                  disabled={uploading}
                >
                  Upload POD
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
