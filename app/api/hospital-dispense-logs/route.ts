import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import DispenseLog from '@/lib/models/dispenseLog';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const logs = await DispenseLog.find({ hospitalId: user._id })
      .populate('medicineId', 'brandName genericName')
      .sort({ dispensedAt: -1 })
      .lean();

    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    console.error('[DISPENSE_LOG_FETCH_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch dispense logs' }, { status: 500 });
  }
}
