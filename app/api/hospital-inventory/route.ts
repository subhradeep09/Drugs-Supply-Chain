import dbConnect from '@/lib/db/mongodborder';
import HospitalOrder from '@/lib/models/orderh';
import DispenseLog from '@/lib/models/dispenseLog';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(session.user._id || session.user.id);

    // Step 1: Get delivered inventory
    const delivered = await HospitalOrder.aggregate([
      {
        $match: {
          userId,
          manufacturerStatus: "delivered"
        }
      },
      {
        $group: {
          _id: "$medicineId",
          medicineName: { $first: "$medicineName" },
          totalDelivered: { $sum: "$quantity" }
        }
      }
    ]);

    // Step 2: Get dispensed inventory
    const dispensed = await DispenseLog.aggregate([
      {
        $match: {
          userId,
        }
      },
      {
        $group: {
          _id: "$medicineId",
          totalDispensed: { $sum: "$quantity" }
        }
      }
    ]);

    // Step 3: Create a map of dispensed quantities
    const dispensedMap = new Map();
    for (const item of dispensed) {
      dispensedMap.set(item._id.toString(), item.totalDispensed);
    }

    // Step 4: Subtract dispensed from delivered
    const adjustedInventory = delivered.map(item => {
      const dispensedQty = dispensedMap.get(item._id.toString()) || 0;
      return {
        _id: item._id,
        medicineName: item.medicineName,
        totalDelivered: item.totalDelivered - dispensedQty
      };
    });

    return NextResponse.json(adjustedInventory);
  } catch (error) {
    console.error("Inventory fetch error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
