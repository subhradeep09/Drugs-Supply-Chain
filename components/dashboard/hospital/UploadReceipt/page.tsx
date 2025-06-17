'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockReceipts = [
  {
    id: 'REC001',
    orderId: 'ORD001',
    drug: 'Paracetamol 500mg',
    quantity: 1000,
    deliveryDate: '2024-03-15',
    status: 'uploaded',
    receiptNumber: 'INV123456',
    supplier: 'PharmaTech',
  },
  {
    id: 'REC002',
    orderId: 'ORD002',
    drug: 'Amoxicillin 250mg',
    quantity: 500,
    deliveryDate: '2024-03-14',
    status: 'pending',
    receiptNumber: 'INV789012',
    supplier: 'MediSupply',
  },
  {
    id: 'REC003',
    orderId: 'ORD003',
    drug: 'Ibuprofen 400mg',
    quantity: 800,
    deliveryDate: '2024-03-13',
    status: 'verified',
    receiptNumber: 'INV345678',
    supplier: 'Global Meds',
  },
]

export function UploadReceipt() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Receipt</h1>
        <p className="text-muted-foreground">Upload and manage delivery receipts</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Awaiting receipt
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploaded Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Receipts uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Within 48 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upload New Receipt</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Order ID</label>
              <Input type="text" placeholder="Enter order ID" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Receipt File</label>
              <Input type="file" accept=".pdf,.jpg,.png" />
            </div>
            <Button>Upload Receipt</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.receiptNumber}</TableCell>
                  <TableCell>{receipt.orderId}</TableCell>
                  <TableCell>{receipt.drug}</TableCell>
                  <TableCell>{receipt.quantity}</TableCell>
                  <TableCell>{receipt.supplier}</TableCell>
                  <TableCell>{receipt.deliveryDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        receipt.status === 'verified'
                          ? 'success'
                          : receipt.status === 'uploaded'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {receipt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {receipt.status === 'pending' && (
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