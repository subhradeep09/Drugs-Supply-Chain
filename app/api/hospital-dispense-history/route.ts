import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';
import DispenseLog from '@/lib/models/dispenseLog';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date();

  try {
    const orders = await Order.find({
      userId: session.user._id,
      manufacturerStatus: 'Delivered',
      'dispatchedBatches.expiryDate': { $gte: today },
    }).populate('medicineId', 'brandName');

    const inventoryMap = new Map();

    for (const order of orders) {
      for (const batch of order.dispatchedBatches) {
        if (new Date(batch.expiryDate) >= today && batch.quantity > 0) {
          const key = String(order.medicineId?._id);
          if (!inventoryMap.has(key)) {
            inventoryMap.set(key, {
              _id: key,
              medicineName: order.medicineId?.brandName || order.medicineName,
              totalDelivered: 0,
            });
          }
          inventoryMap.get(key).totalDelivered += batch.quantity;
        }
      }
    }

    return NextResponse.json(Array.from(inventoryMap.values()));
  } catch (error) {
    console.error('[DISPENSE_FETCH_ERROR]', error);
    return NextResponse.json({ message: 'Error fetching inventory' }, { status: 500 });
  }
}

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
  const medId = new mongoose.Types.ObjectId(drugId);
  const today = new Date();

  try {
    const orders = await Order.find({
      userId,
      medicineId: medId,
      manufacturerStatus: 'Delivered',
      'dispatchedBatches.expiryDate': { $gte: today },
    }).sort({ deliveryDate: 1 }); // FIFO

    let remainingQty = quantity;
    const logs = [];

    for (const order of orders) {
      let updated = false;
      for (const batch of order.dispatchedBatches) {
        if (remainingQty === 0) break;
        if (new Date(batch.expiryDate) < today || batch.quantity === 0) continue;

        const usedQty = Math.min(batch.quantity, remainingQty);
        batch.quantity -= usedQty;
        remainingQty -= usedQty;
        updated = true;
      }
      if (updated) await order.save();
      if (remainingQty === 0) break;
    }

    if (remainingQty > 0) {
      return NextResponse.json({ message: 'Insufficient stock' }, { status: 400 });
    }

    await DispenseLog.create({
      userId,
      medicineId: drugId,
      medicineName: (await Order.findOne({ medicineId: medId }).populate('medicineId', 'brandName'))?.medicineId?.brandName || 'Unknown',
      quantity,
      recipient,
      date: new Date(),
    });

    return NextResponse.json({ message: 'Dispensed successfully' }, { status: 200 });
  } catch (error) {
    console.error('[DISPENSE_ERROR]', error);
    return NextResponse.json({ message: 'Error dispensing drug' }, { status: 500 });
  }
}
