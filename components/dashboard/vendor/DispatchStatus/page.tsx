'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockDispatches = [
  {
    id: 'DSP001',
    orderId: 'ORD001',
    hospital: 'City General Hospital',
    drugs: [
      { name: 'Paracetamol 500mg', quantity: 1000 },
      { name: 'Amoxicillin 250mg', quantity: 500 },
    ],
    status: 'in_transit',
    dispatchDate: '2024-03-15',
    expectedDelivery: '2024-03-20',
    trackingNumber: 'TRK123456',
    courier: 'Express Delivery',
    currentLocation: 'Distribution Center',
  },
  {
    id: 'DSP002',
    orderId: 'ORD002',
    hospital: 'St. Mary Medical Center',
    drugs: [
      { name: 'Ibuprofen 400mg', quantity: 800 },
      { name: 'Omeprazole 20mg', quantity: 300 },
    ],
    status: 'delivered',
    dispatchDate: '2024-03-14',
    expectedDelivery: '2024-03-19',
    trackingNumber: 'TRK123457',
    courier: 'Standard Delivery',
    currentLocation: 'Delivered',
  },
  {
    id: 'DSP003',
    orderId: 'ORD003',
    hospital: 'Regional Health Center',
    drugs: [
      { name: 'Metformin 500mg', quantity: 600 },
      { name: 'Aspirin 75mg', quantity: 400 },
    ],
    status: 'processing',
    dispatchDate: '2024-03-13',
    expectedDelivery: '2024-03-18',
    trackingNumber: 'TRK123458',
    courier: 'Priority Delivery',
    currentLocation: 'Warehouse',
  },
]

export function DispatchStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dispatch Status</h1>
        <p className="text-muted-foreground">Track and monitor order dispatches</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active shipments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Successful deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Deliveries on schedule
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8d</div>
            <p className="text-xs text-muted-foreground">
              Delivery duration
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Dispatches</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search dispatches..."
                className="w-[200px]"
              />
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispatch ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dispatch Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDispatches.map((dispatch) => (
                <TableRow key={dispatch.id}>
                  <TableCell className="font-medium">{dispatch.id}</TableCell>
                  <TableCell>{dispatch.orderId}</TableCell>
                  <TableCell>{dispatch.hospital}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        dispatch.status === 'delivered'
                          ? 'success'
                          : dispatch.status === 'in_transit'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {dispatch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispatch.dispatchDate}</TableCell>
                  <TableCell>{dispatch.expectedDelivery}</TableCell>
                  <TableCell>{dispatch.trackingNumber}</TableCell>
                  <TableCell>{dispatch.currentLocation}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Dispatches</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Average Delivery Time</p>
                  <p className="text-sm text-muted-foreground">From dispatch to delivery</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2.8 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Most Used Courier</p>
                  <p className="text-sm text-muted-foreground">By volume</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Express</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP001</p>
                  <p className="text-sm text-muted-foreground">Arrived at Distribution Center</p>
                </div>
                <Badge variant="secondary">2h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP002</p>
                  <p className="text-sm text-muted-foreground">Delivered to St. Mary Medical Center</p>
                </div>
                <Badge variant="secondary">4h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP003</p>
                  <p className="text-sm text-muted-foreground">Processing at Warehouse</p>
                </div>
                <Badge variant="secondary">6h ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 