'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { AdminDashboard } from '@/components/dashboard/admin/AdminDashboard/page'
import { HospitalDashboard } from '@/components/dashboard/hospital/HospitalDashboard/page'
import { PharmacyDashboard } from '@/components/dashboard/pharmacy/PharmacyDashboard/page'
import { ManufacturerDashboard } from '@/components/dashboard/vendor/ManufacturerDashboard/page'

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user) {
    return null
  }

  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />
    case 'HOSPITAL':
      return <HospitalDashboard />
    case 'PHARMACY':
      return <PharmacyDashboard />
    case 'VENDOR':
      return <ManufacturerDashboard />
    default:
      return null
  }
} 