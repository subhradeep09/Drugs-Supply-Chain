'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockDrugs = [
  { id: '1', name: 'Cetirizine 10mg', manufacturer: 'PharmaTech', available: 2000, price: '$0.30' },
  { id: '2', name: 'Azithromycin 500mg', manufacturer: 'MediSupply', available: 1500, price: '$1.50' },
  { id: '3', name: 'Metformin 500mg', manufacturer: 'Global Meds', available: 3000, price: '$0.60' },
]

export function OrderDrugs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Drugs</h1>
        <p className="text-muted-foreground">Order medicines for your hospital</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Available Drugs</CardTitle>
            <Input type="search" placeholder="Search drugs..." className="w-[200px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drug Name</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDrugs.map((drug) => (
                <TableRow key={drug.id}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.manufacturer}</TableCell>
                  <TableCell>{drug.available}</TableCell>
                  <TableCell>{drug.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Order</Button>
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