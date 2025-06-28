import dbConnect from '@/lib/db/mongodborder';
import PharmacyOrder from '@/lib/models/orderp';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user._id || session.user.id;
    const orders = await PharmacyOrder.find({ userId });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching pharmacy orders:', error);
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const userId = session.user._id || session.user.id;

    const order = await PharmacyOrder.create({
      ...data,
      userId,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating pharmacy order:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
