// app/api/get_pods/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import Pod from '@/lib/models/pod';
import Order from '@/lib/models/orderh';
import Medicine from '@/lib/models/medicine';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const vendorId = session?.user?._id?.toString();

    if (!vendorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Step 1: Get all medicines uploaded by this vendor
    const vendorMedicines = await Medicine.find({ userId: vendorId }, '_id');
    const medicineIds = vendorMedicines.map((med) => med._id.toString());
   

    // Step 2: Get delivered orders with those medicine IDs
    const orders = await Order.find({
      medicineId: { $in: medicineIds },
      manufacturerStatus: 'Delivered',
    });
    const orderIds = orders.map((order) => order.orderId);
   

    // Step 3: Get PODs for those order IDs and vendorId
    const pods = await Pod.find({
      orderId: { $in: orderIds },
      vendorId: vendorId,
    }).sort({ uploadedAt: -1 });

    

    return NextResponse.json(pods);
  } catch (err) {
    console.error('Error fetching PODs:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
