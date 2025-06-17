'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'

const mockRequests = [
  {
    id: 'REQ001',
    hospital: 'City General Hospital',
    requestType: 'Emergency Supply',
    drugs: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
    quantity: 1500,
    status: 'pending',
    requestDate: '2024-03-15',
    priority: 'high',
  },
  {
    id: 'REQ002',
    hospital: 'St. Mary Medical Center',
    requestType: 'Regular Supply',
    drugs: ['Ibuprofen 400mg', 'Omeprazole 20mg'],
    quantity: 800,
    status: 'approved',
    requestDate: '2024-03-14',
    priority: 'medium',
  },
  {
    id: 'REQ003',
    hospital: 'Regional Health Center',
    requestType: 'Monthly Supply',
    drugs: ['Metformin 500mg'],
    quantity: 600,
    status: 'processing',
    requestDate: '2024-03-13',
    priority: 'low',
  },
]

export default function HospitalRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hospital Requests</h1>
        <p className="text-muted-foreground">
          Manage and approve drug supply requests from hospitals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Requests approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Emergency requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>{request.requestType}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {request.drugs.map((drug) => (
                        <div key={drug} className="text-sm">
                          {drug}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.priority === 'high'
                          ? 'destructive'
                          : request.priority === 'medium'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === 'approved'
                          ? 'success'
                          : request.status === 'processing'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            Reject
                          </Button>
                        </>
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