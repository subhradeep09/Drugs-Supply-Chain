'use client';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/ui/table';

export default function HospitalDeliveryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('/api/orderp')
      .then(res => res.json())
      .then(data => {
        // Filter only orders which are 'out for delivery'
        const filtered = data.filter(order => order.manufacturerStatus === 'Out For Delivery');
        setOrders(filtered);
      });
  };

  const handlePacketReceived = async (orderId) => {
    try {
      const res = await fetch(`/api/update-order-statusp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          newStatus: 'delivered'
        }),
      });

      if (res.ok) {
        alert('Status updated to Delivered');
        fetchOrders(); // Refresh data
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error while updating status');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Out for Delivery Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Manufacturer Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.medicineName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>₹{order.totalValue}</TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
              <TableCell>{order.manufacturerStatus}</TableCell>
              <TableCell>
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handlePacketReceived(order._id)}
                >
                  Packet Received
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
