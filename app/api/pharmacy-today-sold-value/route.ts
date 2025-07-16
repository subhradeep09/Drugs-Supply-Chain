// /app/api/pharmacy/today-sold-value/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import PharmacySoldLog from '@/lib/models/Pharmacy-Sold';
import VendorInventory from '@/lib/models/Vendor-Inventory';

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Step 1: Fetch today's sales
    const todayLogs = await PharmacySoldLog.find({
      saleDate: { $gte: today, $lt: tomorrow },
    }).lean();

    if (!todayLogs.length) {
      return NextResponse.json({ todaySalesValue: 0 });
    }

    // Step 2: Fetch all vendor inventories
    const inventories = await VendorInventory.find({}, 'batchNumber offerPrice').lean();

    // Create a Map for fast lookup
    const batchPriceMap = new Map<string, number>();
    inventories.forEach((inv) => {
      if (inv.batchNumber) {
        batchPriceMap.set(inv.batchNumber, inv.offerPrice || 0);
      }
    });

    // Step 3: Calculate total price
    let total = 0;
    for (const log of todayLogs) {
      for (const disp of log.dispensedFrom || []) {
        const price = batchPriceMap.get(disp.batchNumber) || 0;
        total += price * disp.quantity;
      }
    }

    return NextResponse.json({ todaySalesValue: total });
  } catch (error) {
    console.error('[ERROR] /api/pharmacy/today-sold-value:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
