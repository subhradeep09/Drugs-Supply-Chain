import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';
import POD from '@/lib/models/pod';

export async function GET() {
  try {
    await dbConnect();

    // Step 1: Get all delivered orders
    const deliveredOrders = await Order.find({ manufacturerStatus: 'Delivered' })
      .populate('medicineId')       // ✅ include medicine details
      .populate('userId', 'name email organization role'); // ✅ include hospital user details

    // Step 2: Optional — Filter out orders that already have a POD
    const ordersWithPodIds = await POD.find().distinct('orderId');

    const filteredOrders = deliveredOrders.filter(order =>
      !ordersWithPodIds.some(podOrderId => podOrderId.equals(order._id))
    );

    return NextResponse.json(filteredOrders);

  } catch (error: any) {
    console.error('Error fetching delivered orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch delivered orders' },
      { status: 500 }
    );
  }
}
