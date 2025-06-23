'use client'

import { useState } from 'react'
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
  ChevronLeft,
  ChevronRight,
  Home,
  Pill,
  Syringe,
  Factory,
  FlaskConical,
  ShieldCheck,
  Network,
  Gauge,
  ClipboardCheck,
  PackagePlus,
  PackageMinus,
  PackageX,
  CalendarCheck,
  CalendarClock,
  ClipboardEdit,
  ScanBarcode,
  TestTube2 ,
  Stethoscope
} from 'lucide-react'

const adminSidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/admin',
    icon: Gauge,
  },
  {
    title: 'Hospital Requests',
    href: '/dashboard/admin/HospitalRequests',
    icon: ClipboardCheck,
  },
  {
    title: 'Vendor Orders',
    href: '/dashboard/admin/VendorOrders',
    icon: ShoppingCart,
  },
  {
    title: 'Supply Chain',
    href: '/dashboard/admin/SupplyChainTracker',
    icon: Network,
  },
  {
    title: 'Inventory',
    href: '/dashboard/admin/InventoryOverview',
    icon: PackageCheck,
  },
  {
    title: 'New User Requests',
    href: '/dashboard/admin/NewUser',
    icon: Users,
  },
  {
    title: 'User Management',
    href: '/dashboard/admin/UserManagement',
    icon: Users,
  },
  {
    title: 'Drug Management',
    href: '/dashboard/admin/DrugManagement',
    icon: Pill,
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
    href: '/dashboard/admin/Notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    href: '/dashboard/admin/Settings',
    icon: Settings,
  },
]

const hospitalSidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/hospital',
    icon: Gauge,
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
    icon: Syringe,
  },
  {
    title: 'Dispense Drugs',
    href: '/dashboard/hospital/DispenseDrugs',
    icon: ClipboardEdit,
  },
  {
    title: 'Low Stock Alerts',
    href: '/dashboard/hospital/LowStockAlerts',
    icon: AlertCircle,
  },
  {
    title: 'Expiry Logs',
    href: '/dashboard/hospital/DrugExpiryLogs',
    icon: CalendarClock,
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
    icon: Gauge,
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
    icon: Gauge,
  },
  {
    title: 'Add Medicine',
    href: '/dashboard/vendor/AddMedicine',
    icon: PackagePlus,
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
  const [isCollapsed, setIsCollapsed] = useState(false)
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div 
      className={cn(
        "relative h-full flex flex-col border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
        "bg-gradient-to-b from-indigo-50 to-blue-50"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <h2 
          className={cn(
            "text-lg font-semibold whitespace-nowrap transition-all",
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-full",
            "text-indigo-800"
          )}
        >
          {user.role === 'ADMIN' && 'Admin Portal'}
          {user.role === 'HOSPITAL' && 'Hospital Portal'}
          {user.role === 'PHARMACY' && 'Pharmacy Portal'}
          {user.role === 'VENDOR' && 'Vendor Portal'}
        </h2>
        {isCollapsed && (
          <div className="flex items-center justify-center w-full">
            {user.role === 'ADMIN' && <ShieldCheck className="h-6 w-6 text-indigo-600" />}
            {user.role === 'HOSPITAL' && <Stethoscope className="h-6 w-6 text-indigo-600" />}
            {user.role === 'PHARMACY' && <Pill className="h-6 w-6 text-indigo-600" />}
            {user.role === 'VENDOR' && <Factory className="h-6 w-6 text-indigo-600" />}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  'hover:bg-indigo-100 hover:text-indigo-800',
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-800 font-semibold'
                    : 'text-gray-600',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  pathname === item.href ? "text-indigo-600" : "text-gray-500"
                )} />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.title}</span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className={cn(
        "border-t p-4 transition-all",
        isCollapsed ? "px-2" : "px-4"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-medium flex-shrink-0",
            isCollapsed ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"
          )}>
            {user.name?.[0]?.toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button - Centered vertically */}
      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={toggleSidebar}
          className="rounded-full border bg-white p-1 shadow-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-indigo-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-indigo-600" />
          )}
        </button>
      </div>
    </div>
  )
}