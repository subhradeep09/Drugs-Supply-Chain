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

export function VendorDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const [stats, setStats] = useState({
    totalProducts: 45,
    activeOrders: 15,
    pendingShipments: 8,
    monthlyRevenue: 75000,
    qualityChecks: 12,
    inventoryValue: 150000,
  })

  const recentOrders = [
    {
      id: '1',
      product: 'Paracetamol 500mg',
      quantity: 5000,
      status: 'PROCESSING',
      customer: 'City Hospital',
      date: '2024-03-15',
    },
    {
      id: '2',
      product: 'Amoxicillin 250mg',
      quantity: 3000,
      status: 'SHIPPED',
      customer: 'MedPlus Pharmacy',
      date: '2024-03-14',
    },
    {
      id: '3',
      product: 'Ibuprofen 400mg',
      quantity: 4000,
      status: 'DELIVERED',
      customer: 'HealthCare Plus',
      date: '2024-03-13',
    },
  ]

  const columns = [
    { header: 'Product', accessor: 'product' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Status', accessor: 'status' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Date', accessor: 'date' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.name} from {user?.organization}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          name="Total Products"
          value={stats.totalProducts}
          icon={BuildingStorefrontIcon}
          color="blue"
        />
        <StatCard
          name="Active Orders"
          value={stats.activeOrders}
          icon={ClipboardDocumentListIcon}
          color="yellow"
        />
        <StatCard
          name="Pending Shipments"
          value={stats.pendingShipments}
          icon={TruckIcon}
          color="orange"
        />
        <StatCard
          name="Monthly Revenue"
          value={stats.monthlyRevenue}
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
          value={stats.inventoryValue}
          icon={ExclamationTriangleIcon}
          color="red"
        />
      </div>

      <div className="mt-8 space-y-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your recent product orders and shipments
          </p>
          <div className="mt-4">
            <DataTable
              title="Recent Orders"
              description="Track your recent product orders and shipments"
              columns={columns}
              data={recentOrders}
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