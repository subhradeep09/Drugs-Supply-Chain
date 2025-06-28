import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import HospitalOrder from '@/lib/models/orderh';
import DispenseLog from '@/lib/models/dispenseLog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { drugId, quantity, recipient } = await req.json();

  if (!drugId || !quantity || !recipient) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const userId = new mongoose.Types.ObjectId(session.user._id);

  try {
    const [inventory] = await HospitalOrder.aggregate([
      {
        $match: {
          userId,
          manufacturerStatus: 'delivered',
          medicineId: new mongoose.Types.ObjectId(drugId),
        },
      },
      {
        $group: {
          _id: '$medicineId',
          medicineName: { $first: '$medicineName' },
          totalDelivered: { $sum: '$quantity' },
        },
      },
    ]);

    if (!inventory) {
      return NextResponse.json({ message: 'Medicine not found' }, { status: 404 });
    }

    const previousDispensed = await DispenseLog.aggregate([
      {
        $match: {
          userId,
          medicineId: new mongoose.Types.ObjectId(drugId),
        },
      },
      {
        $group: {
          _id: '$medicineId',
          totalDispensed: { $sum: '$quantity' },
        },
      },
    ]);

    const alreadyDispensed = previousDispensed[0]?.totalDispensed || 0;
    const availableStock = inventory.totalDelivered - alreadyDispensed;

    if (quantity > availableStock) {
      return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
    }

    await DispenseLog.create({
      userId,
      medicineId: drugId,
      medicineName: inventory.medicineName,
      quantity,
      recipient,
      date: new Date(),
    });

    return NextResponse.json({ message: 'Dispensed successfully' });
  } catch (error) {
    console.error('Dispense error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
