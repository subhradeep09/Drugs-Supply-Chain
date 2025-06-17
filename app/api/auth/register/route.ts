import { NextRequest, NextResponse } from 'next/server'
import { mockUsers, addUser } from '../login/route'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    console.log('Registration attempt:', { name, email, role })

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role selected' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      )
    }

    // Create new user with plain text password (no hashing)
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password: password, // Save as plain text
      role,
    }

    // Add to shared database
    addUser(newUser)
    
    console.log('User registered successfully:', { email, role })
    console.log('Total users in database:', mockUsers.length)

    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'User registered successfully',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 