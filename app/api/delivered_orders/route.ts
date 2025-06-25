// ✅ API route: /app/api/get_delivered_orders/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';

export async function GET() {
  try {
    await dbConnect();
    const deliveredOrders = await Order.find({ manufacturerStatus: 'delivered' });
    return NextResponse.json(deliveredOrders);
  } catch (error: any) {
    console.error('Error fetching delivered orders:', error);
    return NextResponse.json({ error: 'Failed to fetch delivered orders' }, { status: 500 });
  }
}
