// /app/api/pharmacy-daily-usage/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import PharmacySoldLog from '@/lib/models/Pharmacy-Sold';
import Medicine from '@/lib/models/medicine';
import VendorInventory from '@/lib/models/Vendor-Inventory';

export async function GET() {
  try {
    await dbConnect();

    const logs = await PharmacySoldLog.find().populate({
      path: 'medicineId',
      model: Medicine,
      select: 'brandName',
    });

    const grouped = logs.reduce((acc: Record<string, Record<string, number>>, log) => {
      const date = new Date(log.saleDate).toISOString().split('T')[0]; // fix: use `saleDate`
      const brand = log.medicineId && typeof log.medicineId === 'object' ? log.medicineId.brandName : 'Unknown';

      if (!acc[date]) acc[date] = {};
      if (!acc[date][brand]) acc[date][brand] = 0;

      acc[date][brand] += log.quantity;
      return acc;
    }, {});

    const result = Object.entries(grouped).flatMap(([date, brands]) =>
      Object.entries(brands).map(([brandName, sold]) => ({
        date,
        brandName,
        sold,
      }))
    );
     const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayLogs = logs.filter((log) => {
      const saleDate = new Date(log.saleDate);
      return saleDate >= today && saleDate < tomorrow;
    });

    // Fetch all vendor inventory entries to match batch numbers
    const allVendorInventories = await VendorInventory.find({}, 'batchNumber offerPrice').lean();

    const batchPriceMap = new Map<string, number>();
    allVendorInventories.forEach((inv) => {
      if (inv.batchNumber) batchPriceMap.set(inv.batchNumber, inv.offerPrice || 0);
    });

    const todaySalesValue = todayLogs.reduce((total, log) => {
      const batch = log.batchNumber;
      const price = batchPriceMap.get(batch) || 0;
      return total + (price * log.quantity);
    }, 0);

    return NextResponse.json(result);
    

  } catch (error) {
    console.error('[ERROR] /api/pharmacy-daily-usage:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
