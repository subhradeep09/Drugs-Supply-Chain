'use client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/ui/table';

export default function HospitalOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orderh')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-6 sm:px-10"
      style={{
        background:
          'linear-gradient(rgb(222, 243, 248) 50%)',
      }}
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🧾 My Medicine Orders
        </h1>

        <div className="overflow-x-auto">
          <Table className="min-w-full text-sm">
            <TableHeader className="bg-blue-50 text-gray-700">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell className="font-mono text-xs">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="capitalize">{order.medicineName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.totalValue}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    {order.manufacturerStatus?.toLowerCase() === 'delivered' ? (
                      <span className="inline-block border border-green-500 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {order.manufacturerStatus || 'Wait for confirmation'}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
