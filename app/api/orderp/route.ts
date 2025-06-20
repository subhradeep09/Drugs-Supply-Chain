import dbConnect from '@/lib/db/mongodborder';
import PharmacyOrder from '@/lib/models/orderp';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const orders = await PharmacyOrder.find({});
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const order = await PharmacyOrder.create(data);
  return NextResponse.json(order);
}
