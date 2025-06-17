'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockExpiryLogs = [
  {
    id: 'EXP001',
    drug: 'Paracetamol 500mg',
    batchNumber: 'BATCH123',
    quantity: 1000,
    expiryDate: '2024-04-15',
    daysUntilExpiry: 30,
    status: 'expiring_soon',
    location: 'Main Pharmacy',
    manufacturer: 'MediCorp',
  },
  {
    id: 'EXP002',
    drug: 'Amoxicillin 250mg',
    batchNumber: 'BATCH124',
    quantity: 500,
    expiryDate: '2024-03-25',
    daysUntilExpiry: 10,
    status: 'critical',
    location: 'Pediatrics',
    manufacturer: 'PharmaPlus',
  },
  {
    id: 'EXP003',
    drug: 'Ibuprofen 400mg',
    batchNumber: 'BATCH125',
    quantity: 800,
    expiryDate: '2024-05-15',
    daysUntilExpiry: 60,
    status: 'monitoring',
    location: 'Emergency',
    manufacturer: 'MediCorp',
  },
]

export function DrugExpiryLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Drug Expiry Logs</h1>
        <p className="text-muted-foreground">Monitor and manage drug expiry dates</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Within 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Within 14 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">
              At risk of expiry
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Timely disposal rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expiry Monitoring</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search drugs..."
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
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Days Until Expiry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExpiryLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.drug}</TableCell>
                  <TableCell>{log.batchNumber}</TableCell>
                  <TableCell>{log.quantity}</TableCell>
                  <TableCell>{log.expiryDate}</TableCell>
                  <TableCell>{log.daysUntilExpiry}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.manufacturer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === 'critical'
                          ? 'destructive'
                          : log.status === 'expiring_soon'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {log.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Dispose
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
            <CardTitle>Disposal Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paracetamol 500mg</p>
                  <p className="text-sm text-muted-foreground">Batch: BATCH120</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">500 units</p>
                  <p className="text-sm text-muted-foreground">Disposed 2d ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amoxicillin 250mg</p>
                  <p className="text-sm text-muted-foreground">Batch: BATCH121</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">300 units</p>
                  <p className="text-sm text-muted-foreground">Disposed 5d ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ibuprofen 400mg</p>
                  <p className="text-sm text-muted-foreground">Batch: BATCH122</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">200 units</p>
                  <p className="text-sm text-muted-foreground">Disposed 1w ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiry Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Critical Alert (days)</label>
                <Input type="number" defaultValue="14" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Warning Alert (days)</label>
                <Input type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monitoring Alert (days)</label>
                <Input type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Email</label>
                <Input type="email" placeholder="Enter email for alerts" />
              </div>
              <Button className="w-full">Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 