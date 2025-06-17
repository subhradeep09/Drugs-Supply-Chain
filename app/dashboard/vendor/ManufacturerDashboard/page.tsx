'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'

const mockOrders = [
  {
    id: 'ORD001',
    hospital: 'City General Hospital',
    drugs: [
      { name: 'Paracetamol 500mg', quantity: 1000 },
      { name: 'Amoxicillin 250mg', quantity: 500 },
    ],
    status: 'pending',
    orderDate: '2024-03-15',
    deliveryDate: '2024-03-20',
    totalValue: 2500,
  },
  {
    id: 'ORD002',
    hospital: 'St. Mary Medical Center',
    drugs: [
      { name: 'Ibuprofen 400mg', quantity: 800 },
      { name: 'Omeprazole 20mg', quantity: 300 },
    ],
    status: 'processing',
    orderDate: '2024-03-14',
    deliveryDate: '2024-03-19',
    totalValue: 1800,
  },
  {
    id: 'ORD003',
    hospital: 'Regional Health Center',
    drugs: [
      { name: 'Metformin 500mg', quantity: 600 },
      { name: 'Aspirin 75mg', quantity: 400 },
    ],
    status: 'shipped',
    orderDate: '2024-03-13',
    deliveryDate: '2024-03-18',
    totalValue: 1200,
  },
]

export default function ManufacturerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manufacturer Dashboard</h1>
        <p className="text-muted-foreground">Manage your pharmaceutical manufacturing operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Pending fulfillment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,678</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              On-time delivery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              Customer satisfaction
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paracetamol 500mg</p>
                  <p className="text-sm text-muted-foreground">Batch #BATCH123</p>
                </div>
                <Badge variant="secondary">In Production</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amoxicillin 250mg</p>
                  <p className="text-sm text-muted-foreground">Batch #BATCH124</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ibuprofen 400mg</p>
                  <p className="text-sm text-muted-foreground">Batch #BATCH125</p>
                </div>
                <Badge variant="secondary">Quality Check</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Raw Materials</p>
                  <p className="text-sm text-muted-foreground">Available stock</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Finished Products</p>
                  <p className="text-sm text-muted-foreground">Ready for shipping</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2,500</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Storage Capacity</p>
                  <p className="text-sm text-muted-foreground">Utilization</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">65%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
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
                <TableHead>Delivery Date</TableHead>
                <TableHead>Total Value</TableHead>
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
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>${order.totalValue}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Process
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