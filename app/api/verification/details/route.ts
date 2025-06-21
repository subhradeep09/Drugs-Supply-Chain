import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';

// For demo, use a mock userId. In production, get from session/auth.
const mockUserId = 'demo-user-id';

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  // Example: { licenseNumber, organization, ... }
  try {
    const user = await User.findById(mockUserId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.verificationDetails = body;
    user.verificationStatus = 'PENDING';
    user.isVerified = false;
    await user.save();
    return NextResponse.json({ message: 'Verification details submitted', status: 'PENDING' });
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting details' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const user = await User.findById(mockUserId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      verificationDetails: user.verificationDetails,
      verificationStatus: user.verificationStatus,
      isVerified: user.isVerified,
      rejectionReason: user.rejectionReason,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching details' }, { status: 500 });
  }
} 