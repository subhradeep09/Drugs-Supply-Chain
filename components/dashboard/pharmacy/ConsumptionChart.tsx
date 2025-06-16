'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data for the consumption chart
const mockConsumptionData = {
  daily: [
    { date: '2024-03-10', quantity: 120 },
    { date: '2024-03-11', quantity: 145 },
    { date: '2024-03-12', quantity: 132 },
    { date: '2024-03-13', quantity: 158 },
    { date: '2024-03-14', quantity: 142 },
    { date: '2024-03-15', quantity: 165 },
  ],
  topConsumed: [
    { drug: 'Paracetamol 500mg', quantity: 2500, trend: 'up' },
    { drug: 'Amoxicillin 250mg', quantity: 1800, trend: 'down' },
    { drug: 'Ibuprofen 400mg', quantity: 1500, trend: 'stable' },
    { drug: 'Omeprazole 20mg', quantity: 1200, trend: 'up' },
    { drug: 'Metformin 500mg', quantity: 1000, trend: 'up' },
  ],
  departmentStats: [
    { department: 'Emergency', consumption: 35, trend: 'up' },
    { department: 'Pediatrics', consumption: 25, trend: 'stable' },
    { department: 'Orthopedics', consumption: 20, trend: 'down' },
    { department: 'Internal Medicine', consumption: 15, trend: 'up' },
    { department: 'Surgery', consumption: 5, trend: 'stable' },
  ],
}

export function ConsumptionChart() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Consumption Analytics</h1>
        <p className="text-muted-foreground">Monitor drug consumption patterns and trends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,500</div>
            <p className="text-xs text-muted-foreground">
              Units this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              Units per day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165</div>
            <p className="text-xs text-muted-foreground">
              Units (Mar 15)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Consumption Trends</CardTitle>
              <Select defaultValue="daily">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg bg-muted">
              {/* Placeholder for actual chart component */}
              <p className="text-muted-foreground">Consumption trend chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Department Distribution</CardTitle>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConsumptionData.departmentStats.map((stat) => (
                <div key={stat.department} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{stat.department}</p>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <p className="text-xs text-muted-foreground">
                        {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'} {stat.consumption}%
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{stat.consumption}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Consumed Drugs</CardTitle>
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search drugs..."
                className="w-[200px]"
              />
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockConsumptionData.topConsumed.map((drug) => (
              <div key={drug.drug} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{drug.drug}</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground">
                      {drug.trend === 'up' ? '↑' : drug.trend === 'down' ? '↓' : '→'} {drug.quantity} units
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium">{drug.quantity} units</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 