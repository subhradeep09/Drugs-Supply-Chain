'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockShipmentLogs = [
  {
    id: 'LOG001',
    dispatchId: 'DSP001',
    hospital: 'City General Hospital',
    status: 'in_transit',
    timestamp: '2024-03-15 14:30',
    location: 'Distribution Center',
    event: 'Package picked up by courier',
    courier: 'Express Delivery',
    trackingNumber: 'TRK123456',
  },
  {
    id: 'LOG002',
    dispatchId: 'DSP002',
    hospital: 'St. Mary Medical Center',
    status: 'delivered',
    timestamp: '2024-03-14 16:45',
    location: 'Hospital Reception',
    event: 'Package delivered and signed',
    courier: 'Standard Delivery',
    trackingNumber: 'TRK123457',
  },
  {
    id: 'LOG003',
    dispatchId: 'DSP003',
    hospital: 'Regional Health Center',
    status: 'processing',
    timestamp: '2024-03-13 09:15',
    location: 'Warehouse',
    event: 'Order processed and packaged',
    courier: 'Priority Delivery',
    trackingNumber: 'TRK123458',
  },
]

export function ShipmentLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipment Logs</h1>
        <p className="text-muted-foreground">Track and monitor shipment history and events</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Currently in transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Successful deliveries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Transit Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5d</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Deliveries on schedule
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Shipment History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search shipments..."
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
                <TableHead>Log ID</TableHead>
                <TableHead>Dispatch ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShipmentLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.dispatchId}</TableCell>
                  <TableCell>{log.hospital}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === 'delivered'
                          ? 'success'
                          : log.status === 'in_transit'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell>{log.courier}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP001</p>
                  <p className="text-sm text-muted-foreground">Arrived at Distribution Center</p>
                </div>
                <Badge variant="secondary">2h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP002</p>
                  <p className="text-sm text-muted-foreground">Delivered to St. Mary Medical Center</p>
                </div>
                <Badge variant="secondary">4h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">DSP003</p>
                  <p className="text-sm text-muted-foreground">Processing at Warehouse</p>
                </div>
                <Badge variant="secondary">6h ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courier Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Express Delivery</p>
                  <p className="text-sm text-muted-foreground">Average delivery time</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">1.8 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Standard Delivery</p>
                  <p className="text-sm text-muted-foreground">Average delivery time</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">2.5 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Priority Delivery</p>
                  <p className="text-sm text-muted-foreground">Average delivery time</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">1.2 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 