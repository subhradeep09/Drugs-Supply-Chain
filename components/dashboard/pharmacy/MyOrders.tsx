'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockOrders = [
  { id: 'PORD001', date: '2024-03-10', drug: 'Cetirizine 10mg', quantity: 500, status: 'delivered', value: '$150' },
  { id: 'PORD002', date: '2024-03-12', drug: 'Azithromycin 500mg', quantity: 200, status: 'pending', value: '$300' },
  { id: 'PORD003', date: '2024-03-14', drug: 'Metformin 500mg', quantity: 400, status: 'in_transit', value: '$240' },
]

export function MyOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">View and manage your pharmacy orders</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.drug}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'in_transit' ? 'secondary' : 'default'}>{order.status.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>{order.value}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
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