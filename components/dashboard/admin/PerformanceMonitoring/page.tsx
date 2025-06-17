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
const mockMetrics = [
  {
    id: '1',
    metric: 'API Response Time',
    value: '125ms',
    status: 'healthy',
    threshold: '200ms',
    trend: 'improving',
    lastUpdated: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    metric: 'Database Load',
    value: '65%',
    status: 'warning',
    threshold: '70%',
    trend: 'stable',
    lastUpdated: '2024-03-15T10:30:00Z',
  },
  {
    id: '3',
    metric: 'Memory Usage',
    value: '82%',
    status: 'critical',
    threshold: '80%',
    trend: 'degrading',
    lastUpdated: '2024-03-15T10:30:00Z',
  },
]

export function PerformanceMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Monitoring</h1>
        <p className="text-muted-foreground">
          Monitor system performance and health metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Overall system health
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Current session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.2%</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Metrics</CardTitle>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMetrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell>{metric.metric}</TableCell>
                    <TableCell>{metric.value}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          metric.status === 'healthy'
                            ? 'success'
                            : metric.status === 'warning'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {metric.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{metric.threshold}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          metric.trend === 'improving'
                            ? 'success'
                            : metric.trend === 'stable'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {metric.trend}
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Alerts</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">High Memory Usage</p>
                  <p className="text-xs text-muted-foreground">
                    Memory usage exceeded 80% threshold
                  </p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Database Load Warning</p>
                  <p className="text-xs text-muted-foreground">
                    Database load approaching threshold
                  </p>
                </div>
                <Badge variant="secondary">Warning</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">API Response Time</p>
                  <p className="text-xs text-muted-foreground">
                    Response time improved by 15%
                  </p>
                </div>
                <Badge variant="success">Info</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 