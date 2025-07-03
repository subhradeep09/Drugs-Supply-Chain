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
  const { drugId, quantity, recipient } = await req.json();

  if (!session?.user?._id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!drugId || !quantity || !recipient) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const userId = new mongoose.Types.ObjectId(session.user._id);
  const today = new Date();

  try {
    // Get all valid (delivered + non-expired) batches for this drug
    const orders = await HospitalOrder.find({
      userId,
      medicineId: new mongoose.Types.ObjectId(drugId),
      manufacturerStatus: 'Delivered',
      'dispatchedBatches.expiryDate': { $gte: today }
    });

    // Flatten and filter valid batches
    const validBatches = orders
      .flatMap(o => o.dispatchedBatches.map(b => ({
        ...b.toObject(),
        orderId: o._id
      })))
      .filter(b => new Date(b.expiryDate) >= today);

    const totalAvailable = validBatches.reduce((sum, b) => sum + b.quantity, 0);
    if (quantity > totalAvailable) {
      return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
    }

    // Deduct FIFO-wise
    let remaining = quantity;
    for (const batch of validBatches.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())) {
      if (remaining === 0) break;
      const deductQty = Math.min(batch.quantity, remaining);

      await HospitalOrder.updateOne(
        { _id: batch.orderId, 'dispatchedBatches._id': batch._id },
        { $inc: { 'dispatchedBatches.$.quantity': -deductQty } }
      );

      remaining -= deductQty;
    }

    const medicineName = orders[0]?.medicineName || 'Unknown';

    await DispenseLog.create({
      userId,
      medicineId: drugId,
      medicineName,
      quantity,
      recipient,
      date: new Date()
    });

    return NextResponse.json({ message: 'Dispensed successfully' });
  } catch (err) {
    console.error('DISPENSE_ERROR', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
