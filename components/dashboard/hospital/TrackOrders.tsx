'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockTrackings = [
  {
    id: 'TRK001',
    orderId: 'ORD001',
    drug: 'Paracetamol 500mg',
    quantity: 1000,
    status: 'in_transit',
    currentLocation: 'Distribution Center',
    estimatedArrival: '2024-03-20',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'TRK002',
    orderId: 'ORD002',
    drug: 'Amoxicillin 250mg',
    quantity: 500,
    status: 'out_for_delivery',
    currentLocation: 'Local Hub',
    estimatedArrival: '2024-03-18',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'TRK003',
    orderId: 'ORD003',
    drug: 'Ibuprofen 400mg',
    quantity: 800,
    status: 'processing',
    currentLocation: 'Manufacturing Facility',
    estimatedArrival: '2024-03-25',
    trackingNumber: 'TRK456789123',
  },
]

export function TrackOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Track Orders</h1>
        <p className="text-muted-foreground">Monitor the status of your drug orders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active shipments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out for Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Today's deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Being prepared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Delivery success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Est. Arrival</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrackings.map((tracking) => (
                <TableRow key={tracking.id}>
                  <TableCell className="font-medium">{tracking.trackingNumber}</TableCell>
                  <TableCell>{tracking.orderId}</TableCell>
                  <TableCell>{tracking.drug}</TableCell>
                  <TableCell>{tracking.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tracking.status === 'out_for_delivery'
                          ? 'secondary'
                          : tracking.status === 'in_transit'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {tracking.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{tracking.currentLocation}</TableCell>
                  <TableCell>{tracking.estimatedArrival}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Track Details
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