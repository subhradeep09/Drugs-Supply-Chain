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
const mockTransactions = [
  {
    id: '1',
    transactionHash: '0x7d2...f3a',
    type: 'Drug Transfer',
    status: 'completed',
    timestamp: '2024-03-15T10:30:00Z',
    from: '0x123...abc',
    to: '0x456...def',
    value: '100 units',
    gasUsed: '45,000',
  },
  {
    id: '2',
    transactionHash: '0x9e4...b2c',
    type: 'Inventory Update',
    status: 'pending',
    timestamp: '2024-03-14T15:45:00Z',
    from: '0x789...ghi',
    to: '0x012...jkl',
    value: '500 units',
    gasUsed: '32,000',
  },
  {
    id: '3',
    transactionHash: '0x1a5...d7e',
    type: 'Contract Update',
    status: 'failed',
    timestamp: '2024-03-13T09:15:00Z',
    from: '0x345...mno',
    to: '0x678...pqr',
    value: 'N/A',
    gasUsed: '28,000',
  },
]

export function SmartContractLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Smart Contract Logs</h1>
        <p className="text-muted-foreground">
          Monitor blockchain transactions and smart contract activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
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
              Transaction success
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">
              Total gas units
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Gas Used</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono">{tx.transactionHash}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === 'completed'
                          ? 'success'
                          : tx.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{tx.from}</TableCell>
                  <TableCell className="font-mono">{tx.to}</TableCell>
                  <TableCell>{tx.value}</TableCell>
                  <TableCell>{tx.gasUsed}</TableCell>
                  <TableCell>
                    {new Date(tx.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      {tx.status === 'failed' && (
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
  )
} 