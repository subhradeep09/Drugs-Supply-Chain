'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockDeliveryLogs = [
  {
    id: 'DEL001',
    orderId: 'ORD123',
    supplier: 'MediCorp',
    drugs: [
      { name: 'Paracetamol 500mg', quantity: 1000 },
      { name: 'Amoxicillin 250mg', quantity: 500 },
    ],
    status: 'delivered',
    deliveryDate: '2024-03-15',
    receivedBy: 'Dr. Smith',
    trackingNumber: 'TRK789',
    notes: 'All items received in good condition',
  },
  {
    id: 'DEL002',
    orderId: 'ORD124',
    supplier: 'PharmaPlus',
    drugs: [
      { name: 'Ibuprofen 400mg', quantity: 800 },
      { name: 'Omeprazole 20mg', quantity: 300 },
    ],
    status: 'in_transit',
    deliveryDate: '2024-03-16',
    receivedBy: null,
    trackingNumber: 'TRK790',
    notes: 'Expected delivery by 2 PM',
  },
  {
    id: 'DEL003',
    orderId: 'ORD125',
    supplier: 'MediCorp',
    drugs: [
      { name: 'Aspirin 100mg', quantity: 1200 },
      { name: 'Metformin 500mg', quantity: 600 },
    ],
    status: 'scheduled',
    deliveryDate: '2024-03-17',
    receivedBy: null,
    trackingNumber: 'TRK791',
    notes: 'Delivery scheduled for morning',
  },
]

export function DeliveryLog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Delivery Log</h1>
        <p className="text-muted-foreground">Track and manage drug deliveries</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Expected deliveries
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium">On Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Delivery performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Delivery History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search deliveries..."
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
                <TableHead>Delivery ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Received By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeliveryLogs.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.supplier}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {delivery.drugs.map((drug, index) => (
                        <div key={index} className="text-sm">
                          {drug.name} ({drug.quantity})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        delivery.status === 'delivered'
                          ? 'success'
                          : delivery.status === 'in_transit'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {delivery.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>{delivery.trackingNumber}</TableCell>
                  <TableCell>{delivery.receivedBy || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {delivery.status === 'delivered' ? (
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          Track
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">MediCorp Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Expected: Today, 2:00 PM
                  </p>
                </div>
                <Badge variant="secondary">In Transit</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">PharmaPlus Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Expected: Tomorrow, 10:00 AM
                  </p>
                </div>
                <Badge>Scheduled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">MediCorp Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Expected: Tomorrow, 3:00 PM
                  </p>
                </div>
                <Badge>Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Deliveries</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Average Delivery Time</p>
                  <p className="text-sm text-muted-foreground">From order to delivery</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2.5 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Verification Rate</p>
                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">95%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 