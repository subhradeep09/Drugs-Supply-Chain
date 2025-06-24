import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import dbConnect from '@/lib/db/mongodborder'
import { User } from '@/lib/models/User'
import { Verification } from '@/lib/models/Verification'

export async function POST(req: Request) {
  await dbConnect()

  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user._id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user._id

  const { licenseNumber, organization } = await req.json()

  // Validate input
  if (!licenseNumber || !organization) {
    return NextResponse.json(
      { message: 'License number and organization are required' },
      { status: 400 }
    )
  }

  try {
    // Check if user already submitted a verification request
    const existing = await Verification.findOne({ userId })

    if (existing) {
      return NextResponse.json(
        { message: 'Verification request already submitted' },
        { status: 400 }
      )
    }

    // Create new verification document
    const newVerification = await Verification.create({
      userId,
      licenseNumber,
      organization,
      applicationStatus: 'PENDING',
    })

    // Optional: Update user status to `PENDING` (already default if needed)
    await User.findByIdAndUpdate(userId, {
      applicationStatus: 'PENDING',
    })

    return NextResponse.json(
      { message: 'Verification request submitted successfully', data: newVerification },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Verification apply error:', err)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
