'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockMetrics = {
  overall: {
    rating: 4.8,
    totalOrders: 150,
    onTimeDelivery: 95,
    customerSatisfaction: 92,
  },
  monthly: {
    orders: 45,
    revenue: 125000,
    growth: 12.5,
    returns: 2,
  },
  performance: [
    {
      metric: 'Order Fulfillment',
      value: '98%',
      trend: 'up',
      change: '+2.5%',
    },
    {
      metric: 'Delivery Time',
      value: '2.5 days',
      trend: 'down',
      change: '-0.5 days',
    },
    {
      metric: 'Quality Score',
      value: '4.9/5',
      trend: 'up',
      change: '+0.2',
    },
    {
      metric: 'Return Rate',
      value: '1.2%',
      trend: 'down',
      change: '-0.3%',
    },
  ],
  recentFeedback: [
    {
      id: 'FB001',
      hospital: 'City General Hospital',
      rating: 5,
      comment: 'Excellent service and timely delivery',
      date: '2024-03-15',
    },
    {
      id: 'FB002',
      hospital: 'St. Mary Medical Center',
      rating: 4,
      comment: 'Good quality products, slightly delayed delivery',
      date: '2024-03-14',
    },
    {
      id: 'FB003',
      hospital: 'Regional Health Center',
      rating: 5,
      comment: 'Perfect order fulfillment and communication',
      date: '2024-03-13',
    },
  ],
}

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Metrics</h1>
        <p className="text-muted-foreground">Track and analyze your vendor performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.overall.rating}/5</div>
            <p className="text-xs text-muted-foreground">
              Based on {mockMetrics.overall.totalOrders} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.overall.onTimeDelivery}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.overall.customerSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Based on feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockMetrics.monthly.growth}%</div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMetrics.performance.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.metric}</p>
                    <p className="text-sm text-muted-foreground">Current value</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{item.value}</p>
                    <Badge
                      variant={item.trend === 'up' ? 'success' : 'destructive'}
                      className="ml-2"
                    >
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Orders</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{mockMetrics.monthly.orders}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Revenue</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${mockMetrics.monthly.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Returns</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{mockMetrics.monthly.returns}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feedback ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMetrics.recentFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.id}</TableCell>
                  <TableCell>{feedback.hospital}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        feedback.rating >= 4
                          ? 'success'
                          : feedback.rating >= 3
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {feedback.rating}/5
                    </Badge>
                  </TableCell>
                  <TableCell>{feedback.comment}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
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