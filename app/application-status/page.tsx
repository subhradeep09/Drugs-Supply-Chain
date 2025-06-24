'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/app/ui/button'

export default function ApplicationStatusPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [appStatus, setAppStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/sign-in')
      return
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/verification/status')
        const data = await res.json()

        if (res.ok) {
          setAppStatus(data.applicationStatus)

          if (data.applicationStatus === 'APPROVED') {
            const role = session.user?.role?.toLowerCase() || ''
            router.push(`/dashboard/${role}`)
          }
        } else if (res.status === 404) {
          router.push('/apply-verification') // User never applied
        } else {
          setAppStatus(null)
        }
      } catch (err) {
        console.error('Failed to fetch status:', err)
        setAppStatus(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [session, status, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Checking your application status...</p>
      </div>
    )
  }

  const statusColor = {
    PENDING: 'text-yellow-600',
    APPROVED: 'text-green-600',
    REJECTED: 'text-red-600',
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-2xl border rounded-xl shadow-lg bg-white p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Application Status</h1>
          <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/sign-in' })}>
            Logout
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm text-left">
            <tbody>
              <tr className="border-b">
                <th className="py-2 pr-4 text-muted-foreground w-1/3">Name</th>
                <td className="py-2">{session?.user?.name || '—'}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 pr-4 text-muted-foreground">Email</th>
                <td className="py-2">{session?.user?.email || '—'}</td>
              </tr>
              <tr className="border-b">
                <th className="py-2 pr-4 text-muted-foreground">Role</th>
                <td className="py-2">{session?.user?.role || '—'}</td>
              </tr>
              <tr>
                <th className="py-2 pr-4 text-muted-foreground">Application Status</th>
                <td className={`py-2 font-medium ${statusColor[appStatus || 'REJECTED']}`}>
                  {appStatus || 'Unknown'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {appStatus === 'PENDING' && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Your request is under review by the admin. You’ll be notified once approved.
          </p>
        )}
        {appStatus === 'REJECTED' && (
          <p className="text-sm text-red-600 text-center mt-4">
            Your verification request was rejected. Please contact support or reapply.
          </p>
        )}
      </div>
    </div>
  )
}
