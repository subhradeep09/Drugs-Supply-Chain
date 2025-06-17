'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockDeliveries = [
  {
    id: 'DEL001',
    orderId: 'ORD001',
    drug: 'Paracetamol 500mg',
    quantity: 1000,
    status: 'pending_confirmation',
    deliveryDate: '2024-03-20',
    trackingNumber: 'TRK123456789',
    supplier: 'PharmaTech',
  },
  {
    id: 'DEL002',
    orderId: 'ORD002',
    drug: 'Amoxicillin 250mg',
    quantity: 500,
    status: 'pending_confirmation',
    deliveryDate: '2024-03-18',
    trackingNumber: 'TRK987654321',
    supplier: 'MediSupply',
  },
  {
    id: 'DEL003',
    orderId: 'ORD003',
    drug: 'Ibuprofen 400mg',
    quantity: 800,
    status: 'confirmed',
    deliveryDate: '2024-03-15',
    trackingNumber: 'TRK456789123',
    supplier: 'Global Meds',
  },
]

export function ConfirmDelivery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Confirm Delivery</h1>
        <p className="text-muted-foreground">Verify and confirm received drug deliveries</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Deliveries verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Scheduled deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.drug}</TableCell>
                  <TableCell>{delivery.quantity}</TableCell>
                  <TableCell>{delivery.supplier}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        delivery.status === 'confirmed'
                          ? 'success'
                          : 'default'
                      }
                    >
                      {delivery.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>
                    {delivery.status === 'pending_confirmation' ? (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Report Issue
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    )}
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