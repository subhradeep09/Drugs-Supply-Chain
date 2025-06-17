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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with actual API call
const mockRequests = [
  {
    id: '1',
    hospitalName: 'City General Hospital',
    requestType: 'New Registration',
    status: 'pending',
    submittedAt: '2024-03-15T10:30:00Z',
    details: 'Requesting access to order medications',
  },
  {
    id: '2',
    hospitalName: 'St. Mary Medical Center',
    requestType: 'Inventory Access',
    status: 'approved',
    submittedAt: '2024-03-14T15:45:00Z',
    details: 'Requesting access to view inventory',
  },
  {
    id: '3',
    hospitalName: 'Community Health Clinic',
    requestType: 'User Management',
    status: 'rejected',
    submittedAt: '2024-03-13T09:15:00Z',
    details: 'Requesting to add new users',
  },
]

export function HospitalRequests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hospital Requests</h1>
        <p className="text-muted-foreground">
          Manage and review requests from hospitals
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital Name</TableHead>
                <TableHead>Request Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.hospitalName}</TableCell>
                  <TableCell>{request.requestType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === 'approved'
                          ? 'success'
                          : request.status === 'rejected'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{request.details}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-700 hover:bg-red-100"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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