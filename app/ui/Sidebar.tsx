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
    href: '/dashboard/admin/HospitalRequests',
    icon: ClipboardList,
  },
  {
    title: 'Vendor Orders',
    href: '/dashboard/admin/VendorOrders',
    icon: ShoppingCart,
  },
  {
    title: 'Supply Chain',
    href: '/dashboard/admin/SupplyChainTracker',
    icon: Truck,
  },
  {
    title: 'Inventory',
    href: '/dashboard/admin/InventoryOverview',
    icon: Package,
  },
  {
    title: 'User Management',
    href: '/dashboard/admin/UserManagement',
    icon: Users,
  },
  {
    title: 'Drug Management',
    href: '/dashboard/admin/DrugManagement',
    icon: PackageCheck,
  },
  {
    title: 'Analytics',
    href: '/dashboard/admin/ReportsAnalytics',
    icon: BarChart,
  },
  {
    title: 'Smart Contracts',
    href: '/dashboard/admin/SmartContractLogs',
    icon: FileCode,
  },
  {
    title: 'Performance',
    href: '/dashboard/admin/PerformanceMonitoring',
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
    href: '/dashboard/hospital/OrderDrugs',
    icon: ShoppingCart,
  },
  {
    title: 'My Orders',
    href: '/dashboard/hospital/MyOrders',
    icon: ClipboardList,
  },
  {
    title: 'Track Orders',
    href: '/dashboard/hospital/TrackOrders',
    icon: FileSearch,
  },
  {
    title: 'Confirm Delivery',
    href: '/dashboard/hospital/ConfirmDelivery',
    icon: FileCheck,
  },
  {
    title: 'Usage History',
    href: '/dashboard/hospital/UsageHistory',
    icon: History,
  },
  {
    title: 'Upload Receipt',
    href: '/dashboard/hospital/UploadReceipt',
    icon: Upload,
  },
  {
    title: 'Inventory',
    href: '/dashboard/hospital/ViewInventory',
    icon: Package,
  },
  {
    title: 'Dispense Drugs',
    href: '/dashboard/hospital/DispenseDrugs',
    icon: PackageCheck,
  },
  {
    title: 'Low Stock Alerts',
    href: '/dashboard/hospital/LowStockAlerts',
    icon: AlertCircle,
  },
  {
    title: 'Expiry Logs',
    href: '/dashboard/hospital/DrugExpiryLogs',
    icon: FileWarning,
  },
  {
    title: 'Feedback & Support',
    href: '/dashboard/hospital/FeedbackSupport',
    icon: MessageSquare,
  },
  {
    title: 'Delivery Log',
    href: '/dashboard/hospital/DeliveryLog',
    icon: FileText,
  },
  {
    title: 'Settings',
      href: '/dashboard/hospital/Settings',
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
    href: '/dashboard/pharmacy/OrderDrugs',
    icon: ShoppingCart,
  },
  {
    title: 'My Orders',
    href: '/dashboard/pharmacy/MyOrders',
    icon: ClipboardList,
  },
  {
    title: 'Track Orders',
    href: '/dashboard/pharmacy/TrackOrders',
    icon: FileSearch,
  },
  {
    title: 'Confirm Delivery',
    href: '/dashboard/pharmacy/ConfirmDelivery',
    icon: FileCheck,
  },
  {
    title: 'Inventory',
    href: '/dashboard/pharmacy/ViewInventory',
    icon: Package,
  },
  {
    title: 'Internal Transfers',
    href: '/dashboard/pharmacy/InternalTransfers',
    icon: ArrowLeftRight,
  },
  {
    title: 'Drug Returns',
    href: '/dashboard/pharmacy/DrugReturns',
    icon: RotateCcw,
  },
  {
    title: 'Consumption Chart',
    href: '/dashboard/pharmacy/ConsumptionChart',
    icon: LineChart,
  },
  {
    title: 'Feedback & Alerts',
    href: '/dashboard/pharmacy/FeedbackAlerts',
    icon: AlertCircle,
  },
  {
    title: 'Settings',
    href: '/dashboard/pharmacy/Settings',
    icon: Settings,
  },
]

const vendorSidebarItems = [
  
  {
    title: 'Manufacturer Dashboard',
    href: '/dashboard/vendor/ManufacturerDashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Add Medicine',
    href: '/dashboard/vendor/AddMedicine',
    icon: PlusCircle,
  },
  {
    title: 'Received Orders',
    href: '/dashboard/vendor/ReceivedOrders',
    icon: ShoppingCart,
  },
  {
    title: 'Mark Dispatched',
    href: '/dashboard/vendor/MarkDispatched',
    icon: Send,
  },
  {
    title: 'Dispatch Status',
    href: '/dashboard/vendor/DispatchStatus',
    icon: Truck,
  },
  {
    title: 'Upload Invoice',
    href: '/dashboard/vendor/UploadInvoice',
    icon: FileUp,
  },
  {
    title: 'Upload POD',
    href: '/dashboard/vendor/UploadPOD',
    icon: FileSignature,
  },
  {
    title: 'Performance Metrics',
    href: '/dashboard/vendor/PerformanceMetrics',
    icon: Activity,
  },
  {
    title: 'Shipment Logs',
    href: '/dashboard/vendor/ShipmentLogs',
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
    <div className="flex h-full w-64 flex-col border-r" style={{ backgroundColor: '#CED5F8' }}>
    
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold" style={{  color: '#111111' }}  >
          {user.role === 'ADMIN' && 'Admin Portal'}
          {user.role === 'HOSPITAL' && 'Hospital Portal'}
          {user.role === 'PHARMACY' && 'Pharmacy Portal'}
          {user.role === 'VENDOR' && 'Vendor Portal'}
        </h2>
      </div>
      <div className="flex-1 overflow-auto py-2 ">
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
                <Icon className="h-4 w-4 " style={{ color: '#2D2D2D' }}/>
                <span style={{ color: '#8F8F8F' }}>{item.title}</span>
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