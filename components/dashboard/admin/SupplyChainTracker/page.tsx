'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data - replace with actual API call
const mockShipments = [
  {
    id: '1',
    trackingId: 'SC-2024-001',
    product: 'Paracetamol 500mg',
    quantity: '10,000 units',
    from: 'MediSupply Co.',
    to: 'City General Hospital',
    status: 'in_transit',
    currentLocation: 'Distribution Center A',
    estimatedArrival: '2024-03-18',
  },
  {
    id: '2',
    trackingId: 'SC-2024-002',
    product: 'Amoxicillin 250mg',
    quantity: '5,000 units',
    from: 'PharmaTech Inc.',
    to: 'St. Mary Medical Center',
    status: 'delivered',
    currentLocation: 'Delivered',
    estimatedArrival: '2024-03-15',
  },
  {
    id: '3',
    trackingId: 'SC-2024-003',
    product: 'Ibuprofen 400mg',
    quantity: '8,000 units',
    from: 'Global Meds Ltd.',
    to: 'Community Health Clinic',
    status: 'processing',
    currentLocation: 'Warehouse B',
    estimatedArrival: '2024-03-20',
  },
]

export function SupplyChainTracker() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supply Chain Tracker</h1>
        <p className="text-muted-foreground">
          Monitor and track all shipments in the supply chain
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Currently in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Successful deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Awaiting dispatch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-time Delivery</CardTitle>
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
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.trackingId}</TableCell>
                  <TableCell>{shipment.product}</TableCell>
                  <TableCell>{shipment.quantity}</TableCell>
                  <TableCell>{shipment.from}</TableCell>
                  <TableCell>{shipment.to}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        shipment.status === 'delivered'
                          ? 'success'
                          : shipment.status === 'processing'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {shipment.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.currentLocation}</TableCell>
                  <TableCell>{shipment.estimatedArrival}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
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