import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import PharmacyOrder from '@/lib/models/orderp';

 // replace with your actual path

export async function GET(req: Request) {
  const session = await getServerSession(); // ensure NextAuth is configured

  if (!session || !session.user?.name) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const hospitalName = session.user.name; // or use session.user.email or id based on your setup

  try {
    await dbConnect();

    const orders = await PharmacyOrder.find({
      hospitalName,
      manufacturerStatus: 'Delivered',
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
