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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data - replace with actual API call
const mockDrugs = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Analgesic',
    manufacturer: 'MediSupply Co.',
    status: 'active',
    expiryDate: '2025-03-15',
    stockLevel: 15000,
    price: '$0.50',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    manufacturer: 'PharmaTech Inc.',
    status: 'active',
    expiryDate: '2024-12-20',
    stockLevel: 8000,
    price: '$1.20',
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    category: 'NSAID',
    manufacturer: 'Global Meds Ltd.',
    status: 'discontinued',
    expiryDate: '2024-06-30',
    stockLevel: 0,
    price: '$0.75',
  },
]

export function DrugManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Drug Management</h1>
        <p className="text-muted-foreground">
          Manage drug inventory and details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              Registered drugs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Within 3 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">
              Below threshold
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Drug Inventory</CardTitle>
            <Button variant="outline" size="sm">
              Add New Drug
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drug Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDrugs.map((drug) => (
                <TableRow key={drug.id}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.category}</TableCell>
                  <TableCell>{drug.manufacturer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        drug.status === 'active'
                          ? 'success'
                          : drug.status === 'discontinued'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {drug.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{drug.expiryDate}</TableCell>
                  <TableCell>{drug.stockLevel.toLocaleString()}</TableCell>
                  <TableCell>{drug.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {drug.status === 'active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-700 hover:bg-red-100"
                        >
                          Discontinue
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          Reactivate
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