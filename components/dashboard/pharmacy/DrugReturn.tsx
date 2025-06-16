'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockReturns = [
  {
    id: 'RET001',
    drug: 'Paracetamol 500mg',
    batchNumber: 'BATCH123',
    quantity: 100,
    reason: 'Damaged packaging',
    status: 'pending',
    returnedBy: 'Emergency Dept',
    returnDate: '2024-03-15',
    processedBy: null,
    notes: 'Package seal broken',
  },
  {
    id: 'RET002',
    drug: 'Amoxicillin 250mg',
    batchNumber: 'BATCH124',
    quantity: 50,
    reason: 'Expired',
    status: 'processed',
    returnedBy: 'Pediatrics',
    returnDate: '2024-03-14',
    processedBy: 'Dr. Johnson',
    notes: 'Expired before use',
  },
  {
    id: 'RET003',
    drug: 'Ibuprofen 400mg',
    batchNumber: 'BATCH125',
    quantity: 75,
    reason: 'Quality issue',
    status: 'in_progress',
    returnedBy: 'Orthopedics',
    returnDate: '2024-03-13',
    processedBy: 'Dr. Williams',
    notes: 'Tablets discolored',
  },
]

export function DrugReturn() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Drug Returns</h1>
        <p className="text-muted-foreground">Manage drug returns and recalls</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Being processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Returns completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.5%</div>
            <p className="text-xs text-muted-foreground">
              Of total inventory
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Return Request</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Drug</label>
                  <Input placeholder="Search drug..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Batch Number</label>
                  <Input placeholder="Enter batch number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input placeholder="Select department" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Return Reason</label>
                <Input placeholder="Enter return reason" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input placeholder="Add additional notes" />
              </div>
              <Button className="w-full">Submit Return</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Returns</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">25</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Average Processing Time</p>
                  <p className="text-sm text-muted-foreground">From return to processing</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2.5h</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Most Common Reason</p>
                  <p className="text-sm text-muted-foreground">For returns</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Expired</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Return History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search returns..."
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
                <TableHead>Return ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Returned By</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Processed By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReturns.map((return_) => (
                <TableRow key={return_.id}>
                  <TableCell className="font-medium">{return_.id}</TableCell>
                  <TableCell>{return_.drug}</TableCell>
                  <TableCell>{return_.batchNumber}</TableCell>
                  <TableCell>{return_.quantity}</TableCell>
                  <TableCell>{return_.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        return_.status === 'processed'
                          ? 'success'
                          : return_.status === 'in_progress'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {return_.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{return_.returnedBy}</TableCell>
                  <TableCell>{return_.returnDate}</TableCell>
                  <TableCell>{return_.processedBy || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {return_.status === 'pending' && (
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