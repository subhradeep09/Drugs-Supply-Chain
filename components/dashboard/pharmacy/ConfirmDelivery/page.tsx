'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const mockDeliveries = [
  {
    id: 'DEL001',
    orderId: 'ORD001',
    hospital: 'City Hospital',
    drugs: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
    status: 'Pending Confirmation',
    deliveryDate: '2024-03-17',
    courier: 'Express Delivery',
    trackingNumber: 'TRK123456',
  },
  {
    id: 'DEL002',
    orderId: 'ORD002',
    hospital: 'General Hospital',
    drugs: ['Ibuprofen 400mg', 'Omeprazole 20mg'],
    status: 'Delivered',
    deliveryDate: '2024-03-16',
    courier: 'Quick Ship',
    trackingNumber: 'TRK123457',
  },
]

export function ConfirmDelivery() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Confirm Delivery</h2>
        <p className="text-muted-foreground">
          Verify and confirm the delivery of orders to hospitals.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search deliveries..." className="pl-8" />
        </div>
        <Button>Export</Button>
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
                <TableHead>Hospital</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.hospital}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {delivery.drugs.map((drug) => (
                        <span key={drug} className="text-sm">
                          {drug}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        delivery.status === 'Pending Confirmation'
                          ? 'default'
                          : delivery.status === 'Delivered'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {delivery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{delivery.courier}</span>
                      <span className="text-xs text-muted-foreground">{delivery.trackingNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {delivery.status === 'Pending Confirmation' ? 'Confirm' : 'View Details'}
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