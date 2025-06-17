'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockLowStockAlerts = [
  {
    id: 'ALT001',
    drug: 'Paracetamol 500mg',
    currentStock: 800,
    threshold: 1000,
    lastOrdered: '2024-03-01',
    supplier: 'MediCorp',
    status: 'critical',
    department: 'Main Pharmacy',
    daysUntilStockout: 5,
  },
  {
    id: 'ALT002',
    drug: 'Amoxicillin 250mg',
    currentStock: 400,
    threshold: 500,
    lastOrdered: '2024-03-05',
    supplier: 'PharmaPlus',
    status: 'warning',
    department: 'Pediatrics',
    daysUntilStockout: 10,
  },
  {
    id: 'ALT003',
    drug: 'Ibuprofen 400mg',
    currentStock: 600,
    threshold: 800,
    lastOrdered: '2024-03-10',
    supplier: 'MediCorp',
    status: 'warning',
    department: 'Emergency',
    daysUntilStockout: 15,
  },
]

export function LowStockAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Low Stock Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage low stock situations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Items below 20% threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Items below 50% threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Active reorder requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Alerts</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search alerts..."
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
                <TableHead>Drug</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Ordered</TableHead>
                <TableHead>Days Until Stockout</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLowStockAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.drug}</TableCell>
                  <TableCell>{alert.currentStock}</TableCell>
                  <TableCell>{alert.threshold}</TableCell>
                  <TableCell>{alert.department}</TableCell>
                  <TableCell>{alert.supplier}</TableCell>
                  <TableCell>{alert.lastOrdered}</TableCell>
                  <TableCell>{alert.daysUntilStockout}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.status === 'critical'
                          ? 'destructive'
                          : 'warning'
                      }
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Reorder
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Critical Threshold (%)</label>
                <Input type="number" defaultValue="20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Warning Threshold (%)</label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Email</label>
                <Input type="email" placeholder="Enter email for alerts" />
              </div>
              <Button className="w-full">Save Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paracetamol 500mg</p>
                  <p className="text-sm text-muted-foreground">Reorder requested</p>
                </div>
                <Badge>2h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amoxicillin 250mg</p>
                  <p className="text-sm text-muted-foreground">Stock updated</p>
                </div>
                <Badge>5h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ibuprofen 400mg</p>
                  <p className="text-sm text-muted-foreground">Threshold adjusted</p>
                </div>
                <Badge>1d ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 