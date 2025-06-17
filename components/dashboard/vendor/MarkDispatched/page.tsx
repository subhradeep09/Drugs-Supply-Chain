'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockOrders = [
  {
    id: 'ORD001',
    hospital: 'City General Hospital',
    drugs: [
      { name: 'Paracetamol 500mg', quantity: 1000 },
      { name: 'Amoxicillin 250mg', quantity: 500 },
    ],
    status: 'ready',
    orderDate: '2024-03-15',
    expectedDelivery: '2024-03-20',
    trackingNumber: '',
  },
  {
    id: 'ORD002',
    hospital: 'St. Mary Medical Center',
    drugs: [
      { name: 'Ibuprofen 400mg', quantity: 800 },
      { name: 'Omeprazole 20mg', quantity: 300 },
    ],
    status: 'dispatched',
    orderDate: '2024-03-14',
    expectedDelivery: '2024-03-19',
    trackingNumber: 'TRK123456',
  },
  {
    id: 'ORD003',
    hospital: 'Regional Health Center',
    drugs: [
      { name: 'Metformin 500mg', quantity: 600 },
      { name: 'Aspirin 75mg', quantity: 400 },
    ],
    status: 'ready',
    orderDate: '2024-03-13',
    expectedDelivery: '2024-03-18',
    trackingNumber: '',
  },
]

export function MarkDispatched() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mark Orders as Dispatched</h1>
        <p className="text-muted-foreground">Update order status and tracking information</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Dispatch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Orders pending dispatch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispatched Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Orders marked as dispatched
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Orders dispatched on time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">
              To process dispatch
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders Ready for Dispatch</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search orders..."
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
                <TableHead>Order ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.hospital}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.drugs.map((drug) => (
                        <div key={drug.name} className="text-sm">
                          {drug.name} ({drug.quantity})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'dispatched'
                          ? 'success'
                          : 'default'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell>
                    {order.trackingNumber || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {order.status === 'ready' && (
                        <Button variant="outline" size="sm">
                          Mark Dispatched
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

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Order ID</label>
                <Input placeholder="Enter order ID" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tracking Number</label>
                <Input placeholder="Enter tracking number" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dispatch Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Courier Service</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="standard">Standard Delivery</option>
                  <option value="express">Express Delivery</option>
                  <option value="priority">Priority Delivery</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                rows={3}
                placeholder="Add any dispatch notes..."
              />
            </div>
            <Button type="submit">Update Dispatch Status</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 