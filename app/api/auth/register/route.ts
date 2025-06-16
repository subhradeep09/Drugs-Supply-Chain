import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db/mongodb'
import { User } from '@/lib/models/User'

export async function POST(req: Request) {
  try {
    // Log the incoming request
    console.log('Registration request received')

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      console.error('Error parsing request body:', e)
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { name, email, password, role, organization } = body

    // Log the parsed data (excluding password)
    console.log('Registration data:', { name, email, role, organization })

    // Validate input
    if (!name || !email || !password || !role || !organization) {
      console.log('Missing required fields:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasPassword: !!password, 
        hasRole: !!role, 
        hasOrganization: !!organization 
      })
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Connect to database
    try {
      console.log('Connecting to database...')
      await connectDB()
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection error:', error)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        console.log('User already exists:', email)
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Error checking existing user:', error)
      return NextResponse.json(
        { error: 'Error checking existing user' },
        { status: 500 }
      )
    }

    // Hash password
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
      console.error('Error hashing password:', error)
      return NextResponse.json(
        { error: 'Error processing password' },
        { status: 500 }
      )
    }

    // Create user
    let user
    try {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        organization,
      })
      console.log('User created successfully:', user._id)
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { error: 'Error creating user' },
        { status: 500 }
      )
    }

    // Remove password from response
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
    }

    return NextResponse.json(
      { 
        message: 'User registered successfully', 
        user: userWithoutPassword 
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (error) {
    console.error('Unexpected registration error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
} 