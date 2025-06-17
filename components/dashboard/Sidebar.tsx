'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  Settings,
  BarChart,
  Bell,
  ClipboardList,
  Upload,
  History,
  AlertCircle,
  MessageSquare,
  FileCheck,
  PlusCircle,
  Send,
  Activity,
  ArrowLeftRight,
  RotateCcw,
  LineChart,
  FileWarning,
  PackageCheck,
  FileSearch,
  FileUp,
  FileSignature,
  FileCode,
} from 'lucide-react'

const adminSidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Hospital Requests',
    href: '/dashboard/admin/hospital-requests',
    icon: ClipboardList,
  },
  {
    title: 'Vendor Orders',
    href: '/dashboard/admin/vendor-orders',
    icon: ShoppingCart,
  },
  {
    title: 'Supply Chain',
    href: '/dashboard/admin/supply-chain-tracker',
    icon: Truck,
  },
  {
    title: 'Inventory',
    href: '/dashboard/admin/inventory-overview',
    icon: Package,
  },
  {
    title: 'User Management',
    href: '/dashboard/admin/user-management',
    icon: Users,
  },
  {
    title: 'Drug Management',
    href: '/dashboard/admin/drug-management',
    icon: PackageCheck,
  },
  {
    title: 'Analytics',
    href: '/dashboard/admin/reports-analytics',
    icon: BarChart,
  },
  {
    title: 'Smart Contracts',
    href: '/dashboard/admin/smart-contract-logs',
    icon: FileCode,
  },
  {
    title: 'Performance',
    href: '/dashboard/admin/performance-monitoring',
    icon: Activity,
  },
  {
    title: 'Notifications',
    href: '/dashboard/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    href: '/dashboard/admin/settings',
    icon: Settings,
  },
]

const hospitalSidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/hospital',
    icon: LayoutDashboard,
  },
  {
    title: 'Order Drugs',
    href: '/dashboard/hospital/order-drugs',
    icon: ShoppingCart,
  },
  {
    title: 'My Orders',
    href: '/dashboard/hospital/my-orders',
    icon: ClipboardList,
  },
  {
    title: 'Track Orders',
    href: '/dashboard/hospital/track-orders',
    icon: FileSearch,
  },
  {
    title: 'Confirm Delivery',
    href: '/dashboard/hospital/confirm-delivery',
    icon: FileCheck,
  },
  {
    title: 'Usage History',
    href: '/dashboard/hospital/usage-history',
    icon: History,
  },
  {
    title: 'Upload Receipt',
    href: '/dashboard/hospital/upload-receipt',
    icon: Upload,
  },
  {
    title: 'Inventory',
    href: '/dashboard/hospital/view-inventory',
    icon: Package,
  },
  {
    title: 'Dispense Drugs',
    href: '/dashboard/hospital/dispense-drugs',
    icon: PackageCheck,
  },
  {
    title: 'Low Stock Alerts',
    href: '/dashboard/hospital/low-stock-alerts',
    icon: AlertCircle,
  },
  {
    title: 'Expiry Logs',
    href: '/dashboard/hospital/drug-expiry-logs',
    icon: FileWarning,
  },
  {
    title: 'Feedback & Support',
    href: '/dashboard/hospital/feedback-support',
    icon: MessageSquare,
  },
  {
    title: 'Delivery Log',
    href: '/dashboard/hospital/delivery-log',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/dashboard/hospital/settings',
    icon: Settings,
  },
]

const pharmacySidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/pharmacy',
    icon: LayoutDashboard,
  },
  {
    title: 'Order Drugs',
    href: '/dashboard/pharmacy/order-drugs',
    icon: ShoppingCart,
  },
  {
    title: 'My Orders',
    href: '/dashboard/pharmacy/my-orders',
    icon: ClipboardList,
  },
  {
    title: 'Track Orders',
    href: '/dashboard/pharmacy/track-orders',
    icon: FileSearch,
  },
  {
    title: 'Confirm Delivery',
    href: '/dashboard/pharmacy/confirm-delivery',
    icon: FileCheck,
  },
  {
    title: 'Inventory',
    href: '/dashboard/pharmacy/inventory',
    icon: Package,
  },
  {
    title: 'Internal Transfers',
    href: '/dashboard/pharmacy/internal-transfers',
    icon: ArrowLeftRight,
  },
  {
    title: 'Drug Returns',
    href: '/dashboard/pharmacy/drug-returns',
    icon: RotateCcw,
  },
  {
    title: 'Consumption Chart',
    href: '/dashboard/pharmacy/consumption-chart',
    icon: LineChart,
  },
  {
    title: 'Feedback & Alerts',
    href: '/dashboard/pharmacy/feedback-alerts',
    icon: AlertCircle,
  },
  {
    title: 'Settings',
    href: '/dashboard/pharmacy/settings',
    icon: Settings,
  },
]

const vendorSidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/vendor',
    icon: LayoutDashboard,
  },
  {
    title: 'Manufacturer Dashboard',
    href: '/dashboard/vendor/manufacturer-dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Add Medicine',
    href: '/dashboard/vendor/add-medicine',
    icon: PlusCircle,
  },
  {
    title: 'Received Orders',
    href: '/dashboard/vendor/received-orders',
    icon: ShoppingCart,
  },
  {
    title: 'Mark Dispatched',
    href: '/dashboard/vendor/mark-dispatched',
    icon: Send,
  },
  {
    title: 'Dispatch Status',
    href: '/dashboard/vendor/dispatch-status',
    icon: Truck,
  },
  {
    title: 'Upload Invoice',
    href: '/dashboard/vendor/upload-invoice',
    icon: FileUp,
  },
  {
    title: 'Upload POD',
    href: '/dashboard/vendor/upload-pod',
    icon: FileSignature,
  },
  {
    title: 'Performance Metrics',
    href: '/dashboard/vendor/performance-metrics',
    icon: Activity,
  },
  {
    title: 'Shipment Logs',
    href: '/dashboard/vendor/shipment-logs',
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user) {
    return null
  }

  const sidebarItems = {
    ADMIN: adminSidebarItems,
    HOSPITAL: hospitalSidebarItems,
    PHARMACY: pharmacySidebarItems,
    VENDOR: vendorSidebarItems,
  }[user.role]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">
          {user.role === 'ADMIN' && 'Admin Portal'}
          {user.role === 'HOSPITAL' && 'Hospital Portal'}
          {user.role === 'PHARMACY' && 'Pharmacy Portal'}
          {user.role === 'VENDOR' && 'Vendor Portal'}
        </h2>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 