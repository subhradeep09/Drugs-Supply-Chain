import dbConnect from '@/lib/db/mongodborder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';

import Medicine from '@/lib/models/medicine';
import HospitalOrder from '@/lib/models/orderh';
import PharmacyOrder from '@/lib/models/orderp';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id && !session?.user?._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const vendorId = session.user._id || session.user.id;

    // 🔍 Find all medicines added by the logged-in vendor
    const medicines = await Medicine.find({ userId: vendorId }).select('_id');
    const medicineIds = medicines.map(med => med._id.toString());

    // 📦 Find all hospital orders for those medicines
    const hospitalOrders = await HospitalOrder.find({
      medicineId: { $in: medicineIds },
    }).lean();

    const pharmacyOrders = await PharmacyOrder.find({
      medicineId: { $in: medicineIds },
    }).lean();

    // 🏷 Tag orders with type
    const hospitalWithType = hospitalOrders.map(order => ({
      ...order,
      orderType: 'Hospital',
    }));

    const pharmacyWithType = pharmacyOrders.map(order => ({
      ...order,
      orderType: 'Pharmacy',
    }));

    // 🔗 Combine all and return
    const combinedOrders = [...hospitalWithType, ...pharmacyWithType];

    return NextResponse.json(combinedOrders);
  } catch (error: any) {
    console.error('Error in /api/vendor-received-orders:', error.message);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
