'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockTransfers = [
  {
    id: 'TRF001',
    drug: 'Paracetamol 500mg',
    quantity: 500,
    fromDepartment: 'Main Pharmacy',
    toDepartment: 'Emergency',
    status: 'in_progress',
    requestedBy: 'Dr. Smith',
    requestDate: '2024-03-15',
    transferDate: '2024-03-15',
    notes: 'Urgent transfer needed',
  },
  {
    id: 'TRF002',
    drug: 'Amoxicillin 250mg',
    quantity: 300,
    fromDepartment: 'Main Pharmacy',
    toDepartment: 'Pediatrics',
    status: 'completed',
    requestedBy: 'Dr. Johnson',
    requestDate: '2024-03-14',
    transferDate: '2024-03-14',
    notes: 'Regular stock transfer',
  },
  {
    id: 'TRF003',
    drug: 'Ibuprofen 400mg',
    quantity: 200,
    fromDepartment: 'Emergency',
    toDepartment: 'Orthopedics',
    status: 'pending',
    requestedBy: 'Dr. Williams',
    requestDate: '2024-03-13',
    transferDate: null,
    notes: 'Transfer on next delivery',
  },
]

export function InternalTransfers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Internal Transfers</h1>
        <p className="text-muted-foreground">Manage drug transfers between departments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active transfers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Successful transfers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transfer Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Transfer Request</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Drug</label>
                  <Input placeholder="Search drug..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Department</label>
                  <Input placeholder="Select department" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Department</label>
                  <Input placeholder="Select department" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input placeholder="Add transfer notes" />
              </div>
              <Button className="w-full">Request Transfer</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Transfers</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Average Processing Time</p>
                  <p className="text-sm text-muted-foreground">From request to completion</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">4.5h</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Most Active Department</p>
                  <p className="text-sm text-muted-foreground">By transfer volume</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Emergency</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transfer History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search transfers..."
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
                <TableHead>Transfer ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Transfer Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.id}</TableCell>
                  <TableCell>{transfer.drug}</TableCell>
                  <TableCell>{transfer.quantity}</TableCell>
                  <TableCell>{transfer.fromDepartment}</TableCell>
                  <TableCell>{transfer.toDepartment}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transfer.status === 'completed'
                          ? 'success'
                          : transfer.status === 'in_progress'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {transfer.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{transfer.requestedBy}</TableCell>
                  <TableCell>{transfer.requestDate}</TableCell>
                  <TableCell>{transfer.transferDate || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {transfer.status === 'pending' && (
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