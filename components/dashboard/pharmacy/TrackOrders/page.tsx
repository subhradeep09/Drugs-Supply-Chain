'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const mockOrders = [
  {
    id: 'ORD001',
    hospital: 'City Hospital',
    drugs: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
    status: 'In Transit',
    orderDate: '2024-03-15',
    expectedDelivery: '2024-03-17',
    trackingNumber: 'TRK123456',
    courier: 'Express Delivery',
    currentLocation: 'Distribution Center',
  },
  {
    id: 'ORD002',
    hospital: 'General Hospital',
    drugs: ['Ibuprofen 400mg', 'Omeprazole 20mg'],
    status: 'Out for Delivery',
    orderDate: '2024-03-14',
    expectedDelivery: '2024-03-16',
    trackingNumber: 'TRK123457',
    courier: 'Quick Ship',
    currentLocation: 'Local Hub',
  },
  // Add more mock orders as needed
]

export function TrackOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Track Orders</h2>
        <p className="text-muted-foreground">
          Monitor the status and location of your orders in real-time.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" />
        </div>
        <Button>Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.hospital}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {order.drugs.map((drug) => (
                        <span key={drug} className="text-sm">
                          {drug}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'In Transit'
                          ? 'default'
                          : order.status === 'Out for Delivery'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{order.trackingNumber}</span>
                      <span className="text-xs text-muted-foreground">{order.courier}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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