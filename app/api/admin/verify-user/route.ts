import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';

export async function POST(request: NextRequest) {
  await connectDB();
  const { userId, action, rejectionReason } = await request.json();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (action === 'APPROVE') {
      user.isVerified = true;
      user.verificationStatus = 'APPROVED';
      user.rejectionReason = '';
    } else if (action === 'REJECT') {
      user.isVerified = false;
      user.verificationStatus = 'REJECTED';
      user.rejectionReason = rejectionReason || '';
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
    await user.save();
    return NextResponse.json({
      _id: user._id,
      isVerified: user.isVerified,
      verificationStatus: user.verificationStatus,
      rejectionReason: user.rejectionReason,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
} 