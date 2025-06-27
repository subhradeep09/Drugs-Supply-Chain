'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Navbar } from '@/app/ui/Navbar'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'HOSPITAL',
    organization: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          organization: formData.organization,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/verify-otp/${encodeURIComponent(formData.email)}`)
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label htmlFor="name" className="text-xs font-medium text-gray-600">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="py-2 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-xs font-medium text-gray-600">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-2 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="text-xs font-medium text-gray-600">Organization</label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Org name"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="py-2 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="text-xs font-medium text-gray-600">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border rounded-md"
                    required
                  >
                    <option value="HOSPITAL">Hospital</option>
                    <option value="PHARMACY">Pharmacy</option>
                    <option value="VENDOR">Vendor</option>
                  </select>
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-xs font-medium text-gray-600">Password</label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="py-2 text-sm pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-600">Confirm Password</label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="py-2 text-sm pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-2 text-xs text-red-700 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-2 text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-3 text-center text-xs text-gray-600">
              <p>
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
