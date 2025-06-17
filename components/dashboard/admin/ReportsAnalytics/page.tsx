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
const mockReports = [
  {
    id: '1',
    type: 'Inventory Report',
    period: 'March 2024',
    status: 'generated',
    generatedAt: '2024-03-15T10:30:00Z',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: '2',
    type: 'Sales Analytics',
    period: 'Q1 2024',
    status: 'processing',
    generatedAt: '2024-03-14T15:45:00Z',
    size: '1.8 MB',
    format: 'Excel',
  },
  {
    id: '3',
    type: 'Supply Chain Report',
    period: 'February 2024',
    status: 'failed',
    generatedAt: '2024-03-13T09:15:00Z',
    size: 'N/A',
    format: 'PDF',
  },
]

export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          View and generate system reports and analytics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Generated this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">
              Report storage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Report generation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quick Reports</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full justify-start">
                Generate Inventory Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Sales Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Supply Chain Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate User Activity Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === 'generated'
                            ? 'success'
                            : report.status === 'processing'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {report.status === 'generated' && (
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        )}
                        {report.status === 'failed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            Retry
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
    </div>
  )
} 