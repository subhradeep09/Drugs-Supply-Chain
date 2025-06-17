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
const mockInventory = [
  {
    id: '1',
    product: 'Paracetamol 500mg',
    location: 'City General Hospital',
    quantity: 15000,
    threshold: 5000,
    status: 'in_stock',
    lastUpdated: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    product: 'Amoxicillin 250mg',
    location: 'St. Mary Medical Center',
    quantity: 2000,
    threshold: 3000,
    status: 'low_stock',
    lastUpdated: '2024-03-14T15:45:00Z',
  },
  {
    id: '3',
    product: 'Ibuprofen 400mg',
    location: 'Community Health Clinic',
    quantity: 0,
    threshold: 2000,
    status: 'out_of_stock',
    lastUpdated: '2024-03-13T09:15:00Z',
  },
]

export function InventoryOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Overview</h1>
        <p className="text-muted-foreground">
          Monitor inventory levels across all locations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Below threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.5M</div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Status</CardTitle>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.quantity.toLocaleString()}</TableCell>
                  <TableCell>{item.threshold.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'in_stock'
                          ? 'success'
                          : item.status === 'low_stock'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {item.status !== 'in_stock' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          Reorder
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