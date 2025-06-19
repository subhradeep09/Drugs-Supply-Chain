'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'

const receivedOrders = [
  {
    id: 'REC001',
    supplier: 'ABC Pharma',
    items: [
      { name: 'Vitamin C 500mg', quantity: 300 },
      { name: 'Cough Syrup 100ml', quantity: 150 },
    ],
    status: 'Pending',
    receivedDate: '2024-06-18',
    totalValue: 1200,
  },
  {
    id: 'REC002',
    supplier: 'Global Meds',
    items: [
      { name: 'Pain Relief Gel 50g', quantity: 500 },
      { name: 'Antibiotic Cream', quantity: 200 },
    ],
    status: 'Processing',
    receivedDate: '2024-06-17',
    totalValue: 1800,
  },
  {
    id: 'REC003',
    supplier: 'MediCorp Supplies',
    items: [
      { name: 'Insulin 10ml', quantity: 100 },
      { name: 'Bandages', quantity: 500 },
    ],
    status: 'Shipped',
    receivedDate: '2024-06-16',
    totalValue: 950,
  },
  {
    id: 'REC001',
    supplier: 'ABC Pharma',
    items: [
      { name: 'Vitamin C 500mg', quantity: 300 },
      { name: 'Cough Syrup 100ml', quantity: 150 },
    ],
    status: 'Pending',
    receivedDate: '2024-06-18',
    totalValue: 1200,
  },
  {
    id: 'REC002',
    supplier: 'Global Meds',
    items: [
      { name: 'Pain Relief Gel 50g', quantity: 500 },
      { name: 'Antibiotic Cream', quantity: 200 },
    ],
    status: 'Processing',
    receivedDate: '2024-06-17',
    totalValue: 1800,
  },
  {
    id: 'REC003',
    supplier: 'MediCorp Supplies',
    items: [
      { name: 'Insulin 10ml', quantity: 100 },
      { name: 'Bandages', quantity: 500 },
    ],
    status: 'Shipped',
    receivedDate: '2024-06-16',
    totalValue: 950,
  },
  {
    id: 'REC002',
    supplier: 'Global Meds',
    items: [
      { name: 'Pain Relief Gel 50g', quantity: 500 },
      { name: 'Antibiotic Cream', quantity: 200 },
    ],
    status: 'Processing',
    receivedDate: '2024-06-17',
    totalValue: 1800,
  },
  {
    id: 'REC003',
    supplier: 'MediCorp Supplies',
    items: [
      { name: 'Insulin 10ml', quantity: 100 },
      { name: 'Bandages', quantity: 500 },
    ],
    status: 'Shipped',
    receivedDate: '2024-06-16',
    totalValue: 950,
  },
  {
    id: 'REC003',
    supplier: 'MediCorp Supplies',
    items: [
      { name: 'Insulin 10ml', quantity: 100 },
      { name: 'Bandages', quantity: 500 },
    ],
    status: 'Shipped',
    receivedDate: '2024-06-16',
    totalValue: 950,
  },
]

export default function ReceivedOrdersPage() {

  const handleExport = () => {
    const csvHeaders = [
      'Order ID',
      'Supplier',
      'Items',
      'Status',
      'Received Date',
      'Total Value'
    ].join(',');

    const csvRows = receivedOrders.map(order => {
      const itemsString = order.items.map(item => `${item.name} (${item.quantity})`).join('; ');
      return [
        order.id,
        order.supplier,
        `"${itemsString}"`,
        order.status,
        order.receivedDate,
        order.totalValue
      ].join(',');
    });

    const csvContent = [csvHeaders, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'received_orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Received Orders</h1>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Received Orders</CardTitle>
            <div className="flex space-x-2">
              <Input type="search" placeholder="Search orders..." className="w-[200px]" />
              <Button variant="outline" size="sm" className="hover:bg-blue-50" onClick={handleExport}>
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {receivedOrders.map((order, index) => (
                <TableRow key={`${order.id}-${index}`} className="hover:bg-blue-50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.name} className="text-sm">
                          {item.name} ({item.quantity})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'Shipped'
                        ? 'success' 
                        : order.status === 'Pending'
                        ? 'secondary'
                        : 'default'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.receivedDate}</TableCell>
                  <TableCell>${order.totalValue}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">View</Button>
                      {order.status === 'Processing' && (
                        <Button variant="outline" size="sm" className="hover:bg-green-50">Inspect</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
