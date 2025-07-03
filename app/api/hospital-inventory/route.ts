import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';
import Medicine from '@/lib/models/medicine';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();

    // Get only delivered orders with non-expired batches
    const orders = await Order.find({
      userId: user._id,
      manufacturerStatus: 'Delivered',
      'dispatchedBatches.expiryDate': { $gte: today },
    }).populate('medicineId', 'brandName');

    const inventoryMap = new Map();

    for (const order of orders) {
      const medicineName = order.medicineId?.brandName || order.medicineName;
      const key = medicineName.trim().toLowerCase();

      if (!inventoryMap.has(key)) {
        inventoryMap.set(key, {
          _id: key,
          medicineName,
          totalStock: 0,
          lastOrderedDate: order.deliveryDate,
        });
      }

      const item = inventoryMap.get(key);

      for (const batch of order.dispatchedBatches) {
        if (new Date(batch.expiryDate) >= today) {
          item.totalStock += batch.quantity;
        }
      }

      // Update lastOrderedDate if newer
      if (new Date(order.deliveryDate) > new Date(item.lastOrderedDate)) {
        item.lastOrderedDate = order.deliveryDate;
      }
    }

    return NextResponse.json(Array.from(inventoryMap.values()), { status: 200 });
  } catch (error) {
    console.error('[INVENTORY_FETCH_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}
