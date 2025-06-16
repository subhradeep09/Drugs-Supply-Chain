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
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline'

export function PharmacyDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const [stats, setStats] = useState({
    totalInventory: 150,
    lowStockItems: 8,
    pendingOrders: 12,
    monthlyRevenue: 25000,
    qualityChecks: 5,
    inventoryValue: 75000,
  })

  const inventoryItems = [
    {
      id: '1',
      drug: 'Paracetamol 500mg',
      quantity: 500,
      status: 'IN_STOCK',
      expiryDate: '2024-12-31',
    },
    {
      id: '2',
      drug: 'Amoxicillin 250mg',
      quantity: 200,
      status: 'LOW_STOCK',
      expiryDate: '2024-11-30',
    },
    {
      id: '3',
      drug: 'Ibuprofen 400mg',
      quantity: 350,
      status: 'IN_STOCK',
      expiryDate: '2025-01-15',
    },
  ]

  const columns = [
    { header: 'Drug', accessor: 'drug' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Status', accessor: 'status' },
    { header: 'Expiry Date', accessor: 'expiryDate' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pharmacy Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.name} from {user?.organization}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          name="Total Inventory"
          value={stats.totalInventory}
          icon={BuildingStorefrontIcon}
          color="blue"
        />
        <StatCard
          name="Low Stock Items"
          value={stats.lowStockItems}
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          name="Pending Orders"
          value={stats.pendingOrders}
          icon={TruckIcon}
          color="yellow"
        />
        <StatCard
          name="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          color="green"
        />
        <StatCard
          name="Quality Checks"
          value={stats.qualityChecks}
          icon={DocumentCheckIcon}
          color="purple"
        />
        <StatCard
          name="Inventory Value"
          value={`$${stats.inventoryValue.toLocaleString()}`}
          icon={ClipboardDocumentListIcon}
          color="orange"
        />
      </div>

      <div className="mt-8 space-y-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Inventory Status</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current inventory levels and expiry dates
          </p>
          <div className="mt-4">
            <DataTable
              title="Inventory Status"
              description="Current inventory levels and expiry dates"
              columns={columns}
              data={inventoryItems}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Quality Control</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recent quality control checks and certifications
            </p>
            {/* Add quality control content */}
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Supply Chain Status</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Current supply chain metrics and performance
            </p>
            {/* Add supply chain content */}
          </div>
        </div>
      </div>
    </div>
  )
} 