import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Shared user database - this should be replaced with actual database
// This is now shared between register and login APIs
export let mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@drugchain.com',
    password: 'password', // Plain text password
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Hospital Staff',
    email: 'hospital@drugchain.com',
    password: 'password', // Plain text password
    role: 'HOSPITAL',
  },
  {
    id: '3',
    name: 'Pharmacy Staff',
    email: 'pharmacy@drugchain.com',
    password: 'password', // Plain text password
    role: 'PHARMACY',
  },
  {
    id: '4',
    name: 'Vendor Staff',
    email: 'vendor@drugchain.com',
    password: 'password', // Plain text password
    role: 'VENDOR',
  },
  // Test users with simple passwords for easier testing
  {
    id: '5',
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password', // Plain text password
    role: 'ADMIN',
  },
  {
    id: '6',
    name: 'Test Hospital',
    email: 'hospital@test.com',
    password: 'password', // Plain text password
    role: 'HOSPITAL',
  },
  {
    id: '7',
    name: 'Test Pharmacy',
    email: 'pharmacy@test.com',
    password: 'password', // Plain text password
    role: 'PHARMACY',
  },
  {
    id: '8',
    name: 'Test Vendor',
    email: 'vendor@test.com',
    password: 'password', // Plain text password
    role: 'VENDOR',
  },
]

// Function to add new users (called from registration API)
export function addUser(user: any) {
  mockUsers.push(user)
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json()
    
    console.log('Login attempt:', { email, password: password ? '***' : 'undefined', rememberMe })
    console.log('Available users:', mockUsers.map(u => ({ email: u.email, role: u.role })))

    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = mockUsers.find(u => u.email === email)
    console.log('User found:', user ? 'Yes' : 'No')

    if (!user) {
      console.log('User not found for email:', email)
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Simple password comparison (no hashing)
    const isValidPassword = user.password === password
    console.log('Password valid:', isValidPassword)

    if (!isValidPassword) {
      console.log('Invalid password for user:', email)
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Set token expiration based on remember me
    const expiresIn = rememberMe ? '30d' : '24h'

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn }
    )

    const { password: _, ...userWithoutPassword } = user

    console.log('Login successful for user:', email)
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 