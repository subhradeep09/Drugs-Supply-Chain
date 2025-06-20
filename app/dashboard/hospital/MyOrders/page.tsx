'use client';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/ui/table';

export default function HospitalOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orderh')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">My Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Manufacturer Status</TableHead>
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
              <TableCell>{order.manufacturerStatus || "Wait for confirmation"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
