// /app/api/get_pods/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import Pod from '@/lib/models/pod';
import Order from '@/lib/models/orderh';

export async function GET() {
  try {
    await dbConnect();
    const pods = await Pod.find().lean();

    // Fetch all relevant orders
    const orderIds = pods.map((pod) => pod.orderId);
    const orders = await Order.find({ orderId: { $in: orderIds } }).lean();

    // Create a lookup map of orderId -> hospitalName
    const hospitalMap: Record<string, string> = {};
    orders.forEach((order) => {
      hospitalMap[order.orderId] = order.hospitalName;
    });

    // Attach hospitalName to each pod
    const enrichedPods = pods.map((pod) => ({
      ...pod,
      hospitalName: hospitalMap[pod.orderId] || 'Unknown',
    }));

    return NextResponse.json(enrichedPods);
  } catch (error) {
    console.error('Error in get_pods:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
