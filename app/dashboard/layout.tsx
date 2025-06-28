'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import Sidebar from '@/app/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { user } = useSelector((state: RootState) => state.auth)

  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    const verifyAccess = async () => {
      if (status === 'loading') return

      if (!session || status === 'unauthenticated') {
        router.push('/sign-in')
        return
      }

      const user = session.user

      try {
        const res = await fetch('/api/verification/status')
        const data = await res.json()

        if (!res.ok || data.applicationStatus !== 'APPROVED') {
          router.push('/application-status')
          return
        }

        const role = user.role
        const expectedBasePath = `/dashboard/${role.toLowerCase().replace('_staff', '')}`

        if (!pathname.startsWith(expectedBasePath)) {
          router.push(expectedBasePath)
          return
        }

        setVerifying(false)
      } catch (err) {
        console.error('Verification failed:', err)
        router.push('/application-status')
      }
    }

    verifyAccess()
  }, [status, session, pathname, router])

  if (status === 'loading' || verifying || !session?.user) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
