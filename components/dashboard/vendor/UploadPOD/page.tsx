'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockPODs = [
  {
    id: 'POD001',
    dispatchId: 'DSP001',
    hospital: 'City General Hospital',
    status: 'pending',
    uploadDate: '',
    deliveryDate: '2024-03-20',
    type: 'signature',
    notes: '',
  },
  {
    id: 'POD002',
    dispatchId: 'DSP002',
    hospital: 'St. Mary Medical Center',
    status: 'uploaded',
    uploadDate: '2024-03-19',
    deliveryDate: '2024-03-19',
    type: 'photo',
    notes: 'Delivered to reception desk',
  },
  {
    id: 'POD003',
    dispatchId: 'DSP003',
    hospital: 'Regional Health Center',
    status: 'verified',
    uploadDate: '2024-03-18',
    deliveryDate: '2024-03-18',
    type: 'signature',
    notes: 'Signed by Dr. Smith',
  },
]

export function UploadPOD() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Proof of Delivery</h1>
        <p className="text-muted-foreground">Upload and manage delivery confirmation documents</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending PODs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Awaiting upload
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploaded Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              PODs uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5h</div>
            <p className="text-xs text-muted-foreground">
              To upload POD
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload New POD</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dispatch ID</label>
                <Input placeholder="Enter dispatch ID" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">POD Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="signature">Signature</option>
                  <option value="photo">Photo</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">POD Document</label>
              <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Delivery Notes</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                rows={3}
                placeholder="Add delivery notes or special instructions..."
              />
            </div>
            <Button type="submit">Upload POD</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>POD History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search PODs..."
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
                <TableHead>POD ID</TableHead>
                <TableHead>Dispatch ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPODs.map((pod) => (
                <TableRow key={pod.id}>
                  <TableCell className="font-medium">{pod.id}</TableCell>
                  <TableCell>{pod.dispatchId}</TableCell>
                  <TableCell>{pod.hospital}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {pod.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pod.status === 'verified'
                          ? 'success'
                          : pod.status === 'uploaded'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {pod.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{pod.deliveryDate}</TableCell>
                  <TableCell>{pod.uploadDate || '-'}</TableCell>
                  <TableCell>{pod.notes || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {pod.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Upload
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