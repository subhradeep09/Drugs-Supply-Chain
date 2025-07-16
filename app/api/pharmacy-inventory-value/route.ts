import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import PharmacyInventory from '@/lib/models/Pharmacy-Inventory';
import PharmacyOrder from '@/lib/models/orderp';
import PharmacySoldLog from '@/lib/models/Pharmacy-Sold';

export async function GET() {
  try {
    await dbConnect();

    const inventories = await PharmacyInventory.find({}).lean();

    let totalValue = 0;
    let totalSoldToday = 0;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const soldTodayLogs = await PharmacySoldLog.aggregate([
      { $match: { saleDate: { $gte: todayStart, $lte: todayEnd } } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    totalSoldToday = soldTodayLogs[0]?.total || 0;

    for (const item of inventories) {
      try{
      const { medicineId, totalStock } = item;

      // Fetch the most recent price for this medicine
      const latestOrder = await PharmacyOrder.findOne({ medicineId })
        .sort({ orderDate: -1 })
        .lean();

      const price = Number(latestOrder?.price) || 0;

      // Fetch total sold quantity of this medicine
      const soldLogs = await PharmacySoldLog.aggregate([
        { $match: { medicineId } },
        { $group: { _id: '$medicineId', totalSold: { $sum: '$quantity' } } },
      ]);

      
      const soldQty = Array.isArray(soldLogs) && soldLogs[0]?.totalSold ? soldLogs[0].totalSold : 0;
      const currentStock = Math.max(totalStock - soldQty, 0);

      totalValue += currentStock * price;
    } catch (error) {
      console.error(`Error processing inventory item ${item._id}:`, error);
    }
  }

    return NextResponse.json({
      inventoryValue: totalValue,
       todaySold: totalSoldToday
      
    });
  } catch (error) {
    console.error('Error in inventory value API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
