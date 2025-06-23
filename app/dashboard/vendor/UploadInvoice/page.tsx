'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/ui/table';

export default function InvoiceGeneratorPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    Promise.all([
      fetch('/api/orderh').then(res => res.json()),
      fetch('/api/orderp').then(res => res.json())
    ])
      .then(([hospitalOrders, pharmacyOrders]) => {
        const hospitalData = hospitalOrders.map(order => ({ ...order, orderType: 'Hospital' }));
        const pharmacyData = pharmacyOrders.map(order => ({ ...order, orderType: 'Pharmacy' }));
        const combined = [...hospitalData, ...pharmacyData];
        const acceptedOrders = combined.filter(order => order.manufacturerStatus === 'Processing');
        setOrders(acceptedOrders);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDownloadInvoice = async (order: any) => {
  try {
    const response = await fetch('/api/generate-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_${order.orderId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error(await response.text());
      alert("Failed to generate invoice");
    }
  } catch (err) {
    console.error(err);
    alert("Error generating invoice");
  }
};




  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Generate Invoice - Processing Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Hospital / Pharmacy</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>{order.hospitalName || order.pharmacyName}</TableCell>
              <TableCell>{order.medicineName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDownloadInvoice(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Download Invoice
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
