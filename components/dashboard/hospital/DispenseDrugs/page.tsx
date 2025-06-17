'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockDispensingHistory = [
  {
    id: 'DISP001',
    drug: 'Paracetamol 500mg',
    patientId: 'P12345',
    department: 'Emergency',
    quantity: 20,
    dispensedBy: 'Dr. Smith',
    date: '2024-03-15',
    status: 'completed',
    prescriptionId: 'RX789',
  },
  {
    id: 'DISP002',
    drug: 'Amoxicillin 250mg',
    patientId: 'P12346',
    department: 'Pediatrics',
    quantity: 30,
    dispensedBy: 'Dr. Johnson',
    date: '2024-03-15',
    status: 'in_progress',
    prescriptionId: 'RX790',
  },
  {
    id: 'DISP003',
    drug: 'Ibuprofen 400mg',
    patientId: 'P12347',
    department: 'Orthopedics',
    quantity: 15,
    dispensedBy: 'Dr. Williams',
    date: '2024-03-14',
    status: 'completed',
    prescriptionId: 'RX791',
  },
]

export function DispenseDrugs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Drug Dispensing</h1>
        <p className="text-muted-foreground">Manage and track drug dispensing to patients</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Dispensing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Drugs dispensed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Pending dispensing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Accurate dispensing
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>New Dispensing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient ID</label>
                  <Input placeholder="Enter patient ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prescription ID</label>
                  <Input placeholder="Enter prescription ID" />
                </div>
              </div>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input placeholder="Enter department" />
              </div>
              <Button className="w-full">Dispense Drug</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Dispensing</CardTitle>
              <div className="flex space-x-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drug</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDispensingHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.drug}</TableCell>
                    <TableCell>{record.patientId}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === 'completed'
                            ? 'success'
                            : 'warning'
                        }
                      >
                        {record.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 