'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Input } from '@/app/ui/input'
import { Button } from '@/app/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'

export default function VerifyOtpPage({ params }: { params: { name: string } }) {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const name = params.name

  useEffect(() => {
    if (!name) {
      router.replace('/register') // prevent manual access
    }
  }, [name, router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, otp }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Account verified successfully! Redirecting to login...')
        setTimeout(() => router.push('/sign-in'), 2000)
      } else {
        setMessage(data.message || 'Verification failed.')
      }
    } catch (err) {
      setMessage('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verify Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <Input
              type="text"
              name="otp"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
          {message && (
            <p className="text-center mt-2 text-sm text-muted-foreground">{message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
