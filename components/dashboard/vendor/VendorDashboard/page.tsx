'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manufacturer Dashboard</h1>
        <p className="text-muted-foreground">Overview of manufacturing operations and statistics</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Orders shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">To be shipped</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 