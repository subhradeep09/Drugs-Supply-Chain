import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Order from '@/lib/models/orderh';
import DispenseLog from '@/lib/models/dispenseLog';
import Medicine from '@/lib/models/medicine';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = new mongoose.Types.ObjectId(session.user._id);
    const today = new Date();

    const orders = await Order.find({
      userId,
      manufacturerStatus: 'Delivered',
      'dispatchedBatches.expiryDate': { $gte: today },
    }).populate('medicineId', 'brandName');

    const dispenseLogs = await DispenseLog.find({ userId });

    // Grouping logic
    const medicineMap = new Map();

    for (const order of orders) {
      const name = order.medicineId?.brandName || order.medicineName;
      const key = name.trim().toLowerCase();

      if (!medicineMap.has(key)) {
        medicineMap.set(key, {
          _id: key,
          medicineName: name,
          medicineId: order.medicineId?._id || order.medicineId,
          totalDelivered: 0,
          batches: [],
        });
      }

      const entry = medicineMap.get(key);

      for (const batch of order.dispatchedBatches) {
        if (new Date(batch.expiryDate) >= today) {
          entry.totalDelivered += batch.quantity;
          entry.batches.push({
            batchId: batch._id,
            expiryDate: batch.expiryDate,
            quantity: batch.quantity,
          });
        }
      }
    }

    // Subtract dispensed quantities
    for (const log of dispenseLogs) {
      const key = log.medicineName.trim().toLowerCase();
      if (medicineMap.has(key)) {
        medicineMap.get(key).totalDelivered -= log.quantity;
      }
    }

    // Only show medicines with positive stock
    const filtered = Array.from(medicineMap.values()).filter(m => m.totalDelivered > 0);

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error('[DISPENSE_GET_ERROR]', error);
    return NextResponse.json({ message: 'Error fetching inventory' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { medicineName, quantity, recipient } = await req.json();

    if (!medicineName || !quantity || !recipient) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    let remainingQty = quantity;
    const dispatchedBatches: any[] = [];

    // 🧠 Get delivered, non-expired batches from delivered orders (FIFO)
    const availableOrders = await Order.find({
      medicineName,
      status: 'DELIVERED',
      dispatchedBatches: { $exists: true, $not: { $size: 0 } },
    }).sort({ createdAt: 1 });

    for (const order of availableOrders) {
      for (const batch of order.dispatchedBatches) {
        const today = new Date();
        if (new Date(batch.expiryDate) < today) continue; // Skip expired

        const availableQty = batch.remainingQuantity ?? batch.quantity;
        if (availableQty <= 0) continue;

        const usedQty = Math.min(availableQty, remainingQty);

        // Mark deduction
        batch.remainingQuantity = availableQty - usedQty;
        remainingQty -= usedQty;

        dispatchedBatches.push({
          batchId: batch.batchId,
          batchNumber: batch.batchNumber,
          quantity: usedQty,
          expiryDate: batch.expiryDate,
        });

        if (remainingQty === 0) break;
      }

      await order.save(); // update batch quantities
      if (remainingQty === 0) break;
    }

    if (remainingQty > 0) {
      return NextResponse.json(
        { message: 'Insufficient stock to fulfill the request' },
        { status: 400 }
      );
    }

    // ✅ Save to Dispense Log
    await DispenseLog.create({
      medicineName,
      recipient,
      quantity,
      dispatchedBatches,
      dispensedAt: new Date(),
    });

    return NextResponse.json({ message: 'Dispensed successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('[DISPENSE_POST_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}