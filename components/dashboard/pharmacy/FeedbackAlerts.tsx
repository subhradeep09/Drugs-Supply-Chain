'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const mockFeedback = [
  {
    id: 'FB001',
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Paracetamol 500mg stock below threshold',
    priority: 'high',
    status: 'unread',
    department: 'Emergency',
    timestamp: '2024-03-15 10:30',
    action: 'pending',
  },
  {
    id: 'FB002',
    type: 'feedback',
    title: 'Quality Issue',
    message: 'Report of discolored tablets in batch BATCH123',
    priority: 'medium',
    status: 'read',
    department: 'Pharmacy',
    timestamp: '2024-03-14 15:45',
    action: 'in_progress',
  },
  {
    id: 'FB003',
    type: 'suggestion',
    title: 'Inventory Optimization',
    message: 'Suggestion to adjust reorder levels for Amoxicillin',
    priority: 'low',
    status: 'unread',
    department: 'Inventory',
    timestamp: '2024-03-13 09:15',
    action: 'pending',
  },
]

export function FeedbackAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback & Alerts</h1>
        <p className="text-muted-foreground">Monitor feedback and system alerts</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Urgent feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Within 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option value="alert">Alert</option>
                  <option value="feedback">Feedback</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter feedback title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Enter feedback message" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button className="w-full">Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFeedback.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.title}</p>
                      <Badge
                        variant={
                          item.priority === 'high'
                            ? 'destructive'
                            : item.priority === 'medium'
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.message}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{item.department}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Feedback History</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search feedback..."
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
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.type === 'alert'
                          ? 'destructive'
                          : item.type === 'feedback'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.priority === 'high'
                          ? 'destructive'
                          : item.priority === 'medium'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === 'unread' ? 'default' : 'secondary'}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.action === 'pending'
                          ? 'default'
                          : item.action === 'in_progress'
                          ? 'secondary'
                          : 'success'
                      }
                    >
                      {item.action.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {item.status === 'unread' && (
                        <Button variant="outline" size="sm">
                          Mark Read
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