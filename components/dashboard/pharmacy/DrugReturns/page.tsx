'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Plus } from 'lucide-react'

// Mock data for drug returns
const returns = [
  {
    id: 'RET001',
    date: '2024-03-15',
    drug: 'Paracetamol 500mg',
    batch: 'BATCH123',
    quantity: 50,
    reason: 'Damaged Packaging',
    status: 'PENDING',
    supplier: 'MedSupply Co.',
  },
  {
    id: 'RET002',
    date: '2024-03-14',
    drug: 'Amoxicillin 250mg',
    batch: 'BATCH456',
    quantity: 30,
    reason: 'Expired',
    status: 'APPROVED',
    supplier: 'PharmaPlus',
  },
  {
    id: 'RET003',
    date: '2024-03-13',
    drug: 'Ibuprofen 400mg',
    batch: 'BATCH789',
    quantity: 25,
    reason: 'Quality Issue',
    status: 'COMPLETED',
    supplier: 'MedSupply Co.',
  },
]

export function DrugReturns() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Drug Returns</h1>
        <p className="text-muted-foreground">Manage drug returns to suppliers</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search returns..."
            className="w-[300px]"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Return
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((return_) => (
                <TableRow key={return_.id}>
                  <TableCell>{return_.id}</TableCell>
                  <TableCell>{return_.date}</TableCell>
                  <TableCell>{return_.drug}</TableCell>
                  <TableCell>{return_.batch}</TableCell>
                  <TableCell>{return_.quantity}</TableCell>
                  <TableCell>{return_.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        return_.status === 'COMPLETED'
                          ? 'success'
                          : return_.status === 'APPROVED'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {return_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{return_.supplier}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
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