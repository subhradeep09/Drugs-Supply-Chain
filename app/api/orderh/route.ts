import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const orders = await Order.find({});
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const order = await Order.create(data);
  return NextResponse.json(order);
}
