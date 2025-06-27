'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/app/ui/button'

type AppStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

// Enhanced Card Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-b border-gray-100 px-8 py-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h2>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-8 py-6 ${className}`}>{children}</div>
)

const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-t border-gray-100 bg-gray-50 px-8 py-4 ${className}`}>{children}</div>
)

// Enhanced Badge Component
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'pending' | 'approved' | 'rejected' }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    pending: 'bg-amber-50 text-amber-800 border border-amber-200',
    approved: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    rejected: 'bg-red-50 text-red-800 border border-red-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

// Enhanced Skeleton Loader
const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-gray-100 ${className}`} />
)

// Professional Icons with better sizing
const Icons = {
  externalLink: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  clock: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  alertCircle: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  logout: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
}

export default function ApplicationStatusPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [appStatus, setAppStatus] = useState<AppStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [verificationData, setVerificationData] = useState<any>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) return router.push('/sign-in')

    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/verification/status')
        const data = await res.json()

        if (res.ok) {
          setAppStatus(data.applicationStatus)
          setVerificationData(data)
          if (data.applicationStatus === 'APPROVED') {
            const role = session.user.role?.toLowerCase() || ''
            router.push(`/dashboard/${role}`)
          }
        } else if (res.status === 404) {
          router.push('/apply-verification')
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

  const getBadgeVariant = () => {
    switch (appStatus) {
      case 'PENDING': return 'pending'
      case 'APPROVED': return 'approved'
      case 'REJECTED': return 'rejected'
      default: return 'default'
    }
  }

  const fileLink = (url?: string, label?: string) =>
    url ? (
      <button
        onClick={() => window.open(url, '_blank')}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
      >
        <Icons.externalLink className="mr-1.5" />
        {label}
      </button>
    ) : (
      <span className="text-sm text-gray-400">Not provided</span>
    )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Skeleton className="h-9 w-24" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="bg-white">
          <div className="flex flex-col justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
            <div>
              <CardTitle>Verification Status</CardTitle>
              <p className="text-sm text-gray-500">
                Review your professional verification details
              </p>
            </div>
            <Badge variant={getBadgeVariant()}>
              {appStatus || 'UNKNOWN'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Personal Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Full Name</span>
                  <span className="text-sm font-medium text-gray-900">{session?.user?.name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Email</span>
                  <span className="text-sm font-medium text-gray-900">{session?.user?.email || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Phone</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.phoneNumber || '—'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Professional Details
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Role</span>
                  <span className="text-sm font-medium text-gray-900">{session?.user?.role || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Designation</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.designation || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Organization</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.organization || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                License Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">License Number</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.licenseNumber || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">License Type</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.licenseType || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Issued By</span>
                  <span className="text-sm font-medium text-gray-900">{verificationData?.licenseIssuedBy || '—'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Supporting Documents
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Government ID</span>
                  {fileLink(verificationData?.idProofUrl, 'View Document')}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">License Certificate</span>
                  {fileLink(verificationData?.licenseCertificateUrl, 'View Document')}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Address Proof</span>
                  {fileLink(verificationData?.addressProofUrl, 'View Document')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start">
            {appStatus === 'PENDING' && (
              <p className="flex items-center text-sm font-medium text-amber-600">
                <Icons.clock className="mr-2" />
                Your application is under review. We'll notify you once processed.
              </p>
            )}
            {appStatus === 'REJECTED' && (
              <p className="flex items-center text-sm font-medium text-red-600">
                <Icons.alertCircle className="mr-2" />
                Your application was rejected. Please contact support.
              </p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
            className="w-full sm:w-auto"
          >
            <Icons.logout className="mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}