import { NextResponse } from 'next/server';
import PharmacySoldLog from '@/lib/models/Pharmacy-Sold';
import PharmacyOrder from '@/lib/models/orderp';
import dbConnect from '@/lib/db/mongodborder';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const pharmacyId = searchParams.get('pharmacyId');
    const medicineId = searchParams.get('medicineId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: any = {};
    
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (medicineId) filter.medicineId = medicineId;
    
    // Date range filtering
    if (startDate || endDate) {
      filter.saleDate = {};
      if (startDate) filter.saleDate.$gte = new Date(startDate);
      if (endDate) filter.saleDate.$lte = new Date(endDate);
    }

    // First get all unique medicine IDs from sold records
    const soldMedicines = await PharmacySoldLog.find(filter).distinct('medicineId');
    
    // Then get medicine details from PharmacyOrder
    const medicineDetails = await PharmacyOrder.find({
      medicineId: { $in: soldMedicines }
    })
    .select('medicineId medicineName')
    .lean();

    // Create a mapping of medicineId to medicineName
    const medicineMap = new Map();
    medicineDetails.forEach(order => {
      medicineMap.set(order.medicineId.toString(), order.medicineName);
    });

    // Now fetch the sold records with pagination
    const [soldRecords, total] = await Promise.all([
      PharmacySoldLog.find(filter)
        .select('medicineId quantity saleDate')
        .sort({ saleDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      PharmacySoldLog.countDocuments(filter)
    ]);

    // Transform the data with medicine names
    const responseData = soldRecords.map(record => ({
      medicineId: record.medicineId,
      medicineName: medicineMap.get(record.medicineId.toString()) || 'Unknown Medicine',
      quantity: record.quantity,
      date: record.saleDate
    }));

    return NextResponse.json({
      data: responseData,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching pharmacy sold records:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}