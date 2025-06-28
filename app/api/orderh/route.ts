import dbConnect from '@/lib/db/mongodborder';
import HospitalOrder from '@/lib/models/orderh';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import {User} from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user._id || session.user.id;
    const orders = await HospitalOrder.find({ userId });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching Hospital orders:', error);
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

    
    const userId = session.user._id || session.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const data = await req.json();
    const order = await HospitalOrder.create({
      ...data,
      userId,
      hospitalName: user.name,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating hospital order:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
