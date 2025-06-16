'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { StatCard } from '@/components/ui/StatCard'
import { DataTable } from '@/components/ui/DataTable'
import {
  ClipboardDocumentListIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export function HospitalDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const [stats, setStats] = useState({
    totalRequests: 24,
    pendingRequests: 5,
    activeShipments: 3,
    lowStockAlerts: 2,
  })

  const recentRequests = [
    {
      id: '1',
      drug: 'Paracetamol 500mg',
      quantity: 1000,
      status: 'PENDING',
      date: '2024-03-15',
    },
    {
      id: '2',
      drug: 'Amoxicillin 250mg',
      quantity: 500,
      status: 'APPROVED',
      date: '2024-03-14',
    },
    {
      id: '3',
      drug: 'Ibuprofen 400mg',
      quantity: 750,
      status: 'DELIVERED',
      date: '2024-03-13',
    },
  ]

  const columns = [
    { header: 'Drug', accessor: 'drug' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Status', accessor: 'status' },
    { header: 'Date', accessor: 'date' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.name} from {user?.organization}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          name="Total Requests"
          value={stats.totalRequests}
          icon={ClipboardDocumentListIcon}
          color="blue"
        />
        <StatCard
          name="Pending Requests"
          value={stats.pendingRequests}
          icon={ClockIcon}
          color="yellow"
        />
        <StatCard
          name="Active Shipments"
          value={stats.activeShipments}
          icon={TruckIcon}
          color="green"
        />
        <StatCard
          name="Low Stock Alerts"
          value={stats.lowStockAlerts}
          icon={ExclamationTriangleIcon}
          color="red"
        />
      </div>

      <div className="mt-8">
        <DataTable
          title="Recent Requests"
          description="Your recent drug requests and their status"
          columns={columns}
          data={recentRequests}
        />
      </div>
    </div>
  )
} 