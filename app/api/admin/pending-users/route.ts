import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { dummyVerificationDataset } from '@/lib/db/dummyVerificationDataset';

function calculateMatchScore(userDetails: any, dataset: any[]) {
  let bestScore = 0;
  let bestMatch = null;
  for (const record of dataset) {
    let score = 0;
    if (userDetails.email && userDetails.email === record.email) score += 1;
    if (userDetails.licenseNumber && userDetails.licenseNumber === record.licenseNumber) score += 1;
    if (userDetails.organization && userDetails.organization === record.organization) score += 1;
    if (userDetails.role && userDetails.role === record.role) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = record;
    }
  }
  return { bestScore, bestMatch };
}

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const pendingUsers = await User.find({ verificationStatus: 'PENDING' });
    const usersWithMatch = pendingUsers.map((user: any) => {
      const { bestScore, bestMatch } = calculateMatchScore(user.verificationDetails || {}, dummyVerificationDataset);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        verificationDetails: user.verificationDetails,
        bestMatch,
        matchScore: bestScore,
        createdAt: user.createdAt,
      };
    });
    return NextResponse.json({ users: usersWithMatch });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching pending users' }, { status: 500 });
  }
} 