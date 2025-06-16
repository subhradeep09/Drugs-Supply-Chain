'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const mockSupportTickets = [
  {
    id: 'TICKET001',
    subject: 'Order Delivery Delay',
    category: 'delivery',
    status: 'open',
    priority: 'high',
    submittedBy: 'Dr. Smith',
    department: 'Emergency',
    submittedAt: '2024-03-15 10:30',
    lastUpdated: '2024-03-15 11:45',
  },
  {
    id: 'TICKET002',
    subject: 'System Login Issue',
    category: 'technical',
    status: 'in_progress',
    priority: 'medium',
    submittedBy: 'Nurse Johnson',
    department: 'Pediatrics',
    submittedAt: '2024-03-14 15:20',
    lastUpdated: '2024-03-15 09:15',
  },
  {
    id: 'TICKET003',
    subject: 'Inventory Update Request',
    category: 'inventory',
    status: 'resolved',
    priority: 'low',
    submittedBy: 'Pharmacy Staff',
    department: 'Pharmacy',
    submittedAt: '2024-03-13 14:00',
    lastUpdated: '2024-03-14 16:30',
  },
]

const mockFeedback = [
  {
    id: 'FB001',
    type: 'suggestion',
    content: 'Add batch tracking feature for better inventory management',
    submittedBy: 'Dr. Williams',
    department: 'Pharmacy',
    submittedAt: '2024-03-15',
    status: 'under_review',
  },
  {
    id: 'FB002',
    type: 'complaint',
    content: 'Delivery notifications are not timely',
    submittedBy: 'Nurse Brown',
    department: 'Emergency',
    submittedAt: '2024-03-14',
    status: 'addressed',
  },
  {
    id: 'FB003',
    type: 'praise',
    content: 'New inventory system is very efficient',
    submittedBy: 'Pharmacy Staff',
    department: 'Pharmacy',
    submittedAt: '2024-03-13',
    status: 'acknowledged',
  },
]

export function FeedbackSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback & Support</h1>
        <p className="text-muted-foreground">Manage feedback and support requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active support requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Urgent requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">
              Average response time
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
              Support rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter ticket subject" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Select category" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Input placeholder="Select priority" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your issue in detail"
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">Submit Ticket</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Input placeholder="Select feedback type" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input placeholder="Select department" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Feedback</label>
                <Textarea
                  placeholder="Share your feedback"
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Support Tickets</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search tickets..."
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
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSupportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.priority === 'high'
                          ? 'destructive'
                          : ticket.priority === 'medium'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === 'open'
                          ? 'destructive'
                          : ticket.status === 'in_progress'
                          ? 'secondary'
                          : 'success'
                      }
                    >
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.submittedBy}</TableCell>
                  <TableCell>{ticket.department}</TableCell>
                  <TableCell>{ticket.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {ticket.status === 'open' && (
                        <Button variant="outline" size="sm">
                          Respond
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Feedback</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search feedback..."
                className="w-[200px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="flex items-start justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{feedback.type}</p>
                    <Badge
                      variant={
                        feedback.status === 'under_review'
                          ? 'secondary'
                          : feedback.status === 'addressed'
                          ? 'success'
                          : 'default'
                      }
                    >
                      {feedback.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feedback.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Submitted by {feedback.submittedBy} from {feedback.department} on{' '}
                    {feedback.submittedAt}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Respond
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 