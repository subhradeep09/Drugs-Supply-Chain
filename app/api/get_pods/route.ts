// app/api/vendor_pods/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import Pod from '@/lib/models/pod';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const pods = await Pod.find({ vendorId: userId });

    return NextResponse.json(pods, { status: 200 });
  } catch (err) {
    console.error('Vendor POD fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
