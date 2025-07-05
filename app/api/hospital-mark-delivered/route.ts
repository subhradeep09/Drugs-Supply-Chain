// /app/api/hospital/mark-delivered/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { orderId } = await req.json();

    const order = await Order.findOneAndUpdate(
      { orderId, userId: user._id, manufacturerStatus: 'Out for Delivery' },
      { manufacturerStatus: 'Delivered' },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found or already delivered' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('[MARK_DELIVERED_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
