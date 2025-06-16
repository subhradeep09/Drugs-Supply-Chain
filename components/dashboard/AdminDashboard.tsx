'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { StatCard } from '../ui/StatCard'
import { DataTable } from '../ui/DataTable'

interface DashboardStats {
  totalRequests: number
  pendingRequests: number
  activeShipments: number
  lowStockAlerts: number
}

export function AdminDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const [stats, setStats] = useState<DashboardStats>({
    totalRequests: 0,
    pendingRequests: 0,
    activeShipments: 0,
    lowStockAlerts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch real data from API
    const fetchStats = async () => {
      try {
        // Mock data for now
        setStats({
          totalRequests: 156,
          pendingRequests: 23,
          activeShipments: 45,
          lowStockAlerts: 12,
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (!user || user.role !== 'ADMIN') {
    return null // or redirect to login
  }

  const statCards = [
    {
      name: 'Total Requests',
      value: stats.totalRequests,
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Requests',
      value: stats.pendingRequests,
      icon: ClipboardDocumentListIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Active Shipments',
      value: stats.activeShipments,
      icon: TruckIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Low Stock Alerts',
      value: stats.lowStockAlerts,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
    },
  ]

  const recentRequestsColumns = [
    { header: 'Hospital', accessor: 'hospital' },
    { header: 'Drug', accessor: 'drug' },
    { header: 'Quantity', accessor: 'quantity' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          {value}
        </span>
      ),
    },
  ]

  const supplyChainColumns = [
    { header: 'Vendor', accessor: 'vendor' },
    { header: 'Destination', accessor: 'destination' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          {value}
        </span>
      ),
    },
    { header: 'ETA', accessor: 'eta' },
  ]

  const mockRequests = [
    {
      hospital: 'AIIMS Delhi',
      drug: 'Paracetamol',
      quantity: 1000,
      status: 'Pending',
    },
  ]

  const mockShipments = [
    {
      vendor: 'MedPlus',
      destination: 'Safdarjung Hospital',
      status: 'In Transit',
      eta: '2 hours',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the drug supply chain system
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <StatCard key={stat.name} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DataTable
              columns={recentRequestsColumns}
              data={mockRequests}
              title="Recent Requests"
              description="Latest drug requests from hospitals"
            />

            <DataTable
              columns={supplyChainColumns}
              data={mockShipments}
              title="Supply Chain Status"
              description="Active shipments and deliveries"
            />
          </div>
        </>
      )}
    </div>
  )
} 