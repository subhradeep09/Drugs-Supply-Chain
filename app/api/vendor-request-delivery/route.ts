// /app/api/vendor/request-delivery/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Order from '@/lib/models/orderh';
import Medicine from '@/lib/models/medicine';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Step 1: Get all medicineIds where user is the vendor
    const vendorMedicines = await Medicine.find({ userId: user._id }).select('_id');
    const vendorMedicineIds = vendorMedicines.map(med => med._id);

    // Step 2: Get orders that are 'Dispatched' and belong to those medicineIds
    const dispatchedOrders = await Order.find({
      medicineId: { $in: vendorMedicineIds },
      manufacturerStatus: 'Dispatched',
    }).lean();
    console.log(dispatchedOrders);

    return NextResponse.json(dispatchedOrders, { status: 200 });

  } catch (error) {
    console.error('[GET_VENDOR_DISPATCHED_ORDERS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch dispatched orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { ordersId } = await req.json();
  // console.log(orderId);

  try {
    const order = await Order.findById(ordersId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Only allow if status is still 'Dispatched'
    if (order.manufacturerStatus !== 'Dispatched') {
      return NextResponse.json({ error: 'Order is not eligible for delivery request' }, { status: 400 });
    }

    order.manufacturerStatus = 'Requested for Delivery';
    await order.save();

    return NextResponse.json({ success: true, message: 'Marked as requested for delivery' });

  } catch (error) {
    console.error('[POST_VENDOR_REQUEST_DELIVERY_ERROR]', error);
    return NextResponse.json({ error: 'Failed to request delivery' }, { status: 500 });
  }
}
