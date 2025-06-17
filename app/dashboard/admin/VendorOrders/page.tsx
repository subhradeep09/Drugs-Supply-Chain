'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'

const mockOrders = [
  {
    id: 'ORD001',
    vendor: 'MediSupply Co.',
    hospital: 'City General Hospital',
    drugs: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
    quantity: 1000,
    status: 'pending',
    orderDate: '2024-03-15',
    totalValue: 500,
  },
  {
    id: 'ORD002',
    vendor: 'PharmaTech Inc.',
    hospital: 'St. Mary Medical Center',
    drugs: ['Ibuprofen 400mg', 'Omeprazole 20mg'],
    quantity: 800,
    status: 'processing',
    orderDate: '2024-03-14',
    totalValue: 640,
  },
  {
    id: 'ORD003',
    vendor: 'Global Meds Ltd.',
    hospital: 'Regional Health Center',
    drugs: ['Metformin 500mg'],
    quantity: 600,
    status: 'shipped',
    orderDate: '2024-03-13',
    totalValue: 480,
  },
]

export default function VendorOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Orders</h1>
        <p className="text-muted-foreground">
          Monitor and manage orders between vendors and hospitals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Orders delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.hospital}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.drugs.map((drug) => (
                        <div key={drug} className="text-sm">
                          {drug}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'shipped'
                          ? 'success'
                          : order.status === 'processing'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>${order.totalValue}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
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