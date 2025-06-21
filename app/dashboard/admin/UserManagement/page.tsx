'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'
import { useEffect, useState } from 'react'

const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@drugchain.com',
    role: 'ADMIN',
    status: 'active',
    lastLogin: '2024-03-15 10:30',
  },
  {
    id: '2',
    name: 'Hospital Staff',
    email: 'hospital@drugchain.com',
    role: 'HOSPITAL',
    status: 'active',
    lastLogin: '2024-03-15 09:15',
  },
  {
    id: '3',
    name: 'Pharmacy Staff',
    email: 'pharmacy@drugchain.com',
    role: 'PHARMACY',
    status: 'active',
    lastLogin: '2024-03-14 16:45',
  },
  {
    id: '4',
    name: 'Vendor Staff',
    email: 'vendor@drugchain.com',
    role: 'VENDOR',
    status: 'inactive',
    lastLogin: '2024-03-10 14:20',
  },
]

function PendingUsers() {
  const [pending, setPending] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchPending = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/pending-users')
    const data = await res.json()
    setPending(data.users)
    setLoading(false)
  }

  useEffect(() => { fetchPending() }, [])

  const handleAction = async (userId: string, action: 'APPROVE' | 'REJECT') => {
    setActionLoading(userId + action)
    await fetch('/api/admin/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action }),
    })
    setActionLoading(null)
    fetchPending()
  }

  if (loading) return <div className="p-4">Loading pending users...</div>
  if (pending.length === 0) return <div className="p-4">No pending user requests.</div>

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Pending User Requests</h2>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Organization</th>
              <th className="p-3 text-left">License</th>
              <th className="p-3 text-left">Match Score</th>
              <th className="p-3 text-left">Best Match</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.verificationDetails?.organization || '-'}</td>
                <td className="p-3">{user.verificationDetails?.licenseNumber || '-'}</td>
                <td className="p-3">{user.matchScore}/4</td>
                <td className="p-3 text-xs">
                  {user.bestMatch ? (
                    <div>
                      <div>Email: {user.bestMatch.email}</div>
                      <div>License: {user.bestMatch.licenseNumber}</div>
                      <div>Org: {user.bestMatch.organization}</div>
                      <div>Role: {user.bestMatch.role}</div>
                    </div>
                  ) : 'No match'}
                </td>
                <td className="p-3 flex gap-2">
                  <button className="btn-primary" disabled={actionLoading === user._id + 'APPROVE'} onClick={() => handleAction(user._id, 'APPROVE')}>Approve</button>
                  <button className="btn-danger" disabled={actionLoading === user._id + 'REJECT'} onClick={() => handleAction(user._id, 'REJECT')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btn-primary { @apply bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition; }
        .btn-danger { @apply bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition; }
      `}</style>
    </div>
  )
}

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <PendingUsers />
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage system users and their permissions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              New registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Users</CardTitle>
            <Button>Add New User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === 'active' ? 'success' : 'secondary'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
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