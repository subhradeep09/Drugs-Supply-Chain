'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockUsageHistory = [
  {
    id: 'USE001',
    drug: 'Paracetamol 500mg',
    department: 'Emergency',
    quantity: 500,
    date: '2024-03-15',
    status: 'completed',
    batchNumber: 'BATCH123',
    issuedBy: 'Dr. Smith',
  },
  {
    id: 'USE002',
    drug: 'Amoxicillin 250mg',
    department: 'Pediatrics',
    quantity: 200,
    date: '2024-03-14',
    status: 'completed',
    batchNumber: 'BATCH456',
    issuedBy: 'Dr. Johnson',
  },
  {
    id: 'USE003',
    drug: 'Ibuprofen 400mg',
    department: 'General Ward',
    quantity: 300,
    date: '2024-03-13',
    status: 'in_progress',
    batchNumber: 'BATCH789',
    issuedBy: 'Dr. Williams',
  },
]

export function UsageHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Usage History</h1>
        <p className="text-muted-foreground">Track drug usage across departments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">
              Units this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              Units dispensed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              In circulation
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Usage</CardTitle>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usage ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Issued By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsageHistory.map((usage) => (
                <TableRow key={usage.id}>
                  <TableCell className="font-medium">{usage.id}</TableCell>
                  <TableCell>{usage.drug}</TableCell>
                  <TableCell>{usage.department}</TableCell>
                  <TableCell>{usage.quantity}</TableCell>
                  <TableCell>{usage.date}</TableCell>
                  <TableCell>{usage.batchNumber}</TableCell>
                  <TableCell>{usage.issuedBy}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        usage.status === 'completed'
                          ? 'success'
                          : 'secondary'
                      }
                    >
                      {usage.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
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