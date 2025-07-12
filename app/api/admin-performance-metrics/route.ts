// FILE: app/api/performance-metrics/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import Order from '@/lib/models/orderh';
import PharmacyOrder from '@/lib/models/orderp';
import VendorInventory from '@/lib/models/Vendor-Inventory';


export async function GET(req: NextRequest) {
  await dbConnect();

  const filter = req.nextUrl.searchParams.get('filter') || 'monthly';

  const now = new Date();
  let fromDate = new Date();

  if (filter === 'weekly') fromDate.setDate(now.getDate() - 7);
  else if (filter === 'monthly') fromDate.setMonth(now.getMonth() - 1);
  else if (filter === 'yearly') fromDate.setFullYear(now.getFullYear() - 1);

  const [hospitalOrdersRaw, pharmacyOrdersRaw] = await Promise.all([
    Order.find({ createdAt: { $gte: fromDate } })
      .populate({
        path: 'medicineId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      }),
    PharmacyOrder.find({ createdAt: { $gte: fromDate } })
      .populate({
        path: 'medicineId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      }),
  ]);

  const allOrders = [...hospitalOrdersRaw, ...pharmacyOrdersRaw];

  const deliveredOrders = allOrders.filter(
    (o) => o.manufacturerStatus === 'Delivered'
  );

  const avgDeliveryTimeHours =
    deliveredOrders.reduce((sum, o) => {
      const created = new Date(o.createdAt).getTime();
      const updated = new Date(o.updatedAt).getTime();
      return sum + (updated - created);
    }, 0) /
    (deliveredOrders.length || 1) /
    (1000 * 60 * 60);

  const fulfillmentRate =
    ((deliveredOrders.length / (allOrders.length || 1)) * 100).toFixed(2) + '%';

  const totalOrders = allOrders.length;

  const inventory = await VendorInventory.find()
    .populate('medicineId', 'brandName')
    .populate('userId', 'name');

  const lowStockIncidents = inventory.filter(
    (item) => item.stockQuantity < 10
  ).length;

  const expiredDrugs = inventory.filter(
    (item) => new Date(item.expiryDate) < new Date()
  ).length;

  const vendorOrders: Record<string, number> = {};
  const medicineOrders: Record<string, number> = {};
  const hospitalOrders: Record<string, number> = {};
  const pharmacyOrders: Record<string, number> = {};

  const processOrder = (order: any, type: 'Hospital' | 'Pharmacy') => {
    const vendorName = order.medicineId?.userId?.name || 'Unknown Vendor';
    const medicineName = order.medicineId?.brandName || order.medicineName || 'Unknown Drug';

    vendorOrders[vendorName] = (vendorOrders[vendorName] || 0) + 1;
    medicineOrders[medicineName] = (medicineOrders[medicineName] || 0) + 1;

    if (type === 'Hospital') {
      const hospitalName = order.hospitalName || 'Unknown Hospital';
      hospitalOrders[hospitalName] = (hospitalOrders[hospitalName] || 0) + 1;
    } else {
      const pharmacyName = order.hospitalName || 'Unknown Pharmacy';
      pharmacyOrders[pharmacyName] = (pharmacyOrders[pharmacyName] || 0) + 1;
    }
  };

  hospitalOrdersRaw.forEach((o) => processOrder(o, 'Hospital'));
  pharmacyOrdersRaw.forEach((o) => processOrder(o, 'Pharmacy'));

  return NextResponse.json({
    metrics: {
      totalOrders,
      avgDeliveryTime: avgDeliveryTimeHours.toFixed(1),
      fulfillmentRate,
      lowStockIncidents,
      expiredDrugs,
    },
    charts: {
      vendorOrders: Object.entries(vendorOrders).map(([vendor, orders]) => ({ vendor, orders })),
      topDrugs: Object.entries(medicineOrders).map(([medicine, count]) => ({ medicine, count })),
      topHospitals: Object.entries(hospitalOrders).map(([hospital, orders]) => ({ hospital, orders })),
      topPharmacies: Object.entries(pharmacyOrders).map(([pharmacy, orders]) => ({ pharmacy, orders })),
    },
  });
}
