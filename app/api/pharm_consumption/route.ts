// /app/api/pharmacy/consumption/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import PharmacySoldLog from '@/lib/models/Pharmacy-Sold';
import PharmacyInventory from '@/lib/models/Pharmacy-Inventory';
import Medicine from '@/lib/models/medicine';
import mongoose from 'mongoose';

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;

    const UserModel = mongoose.model('User');
    const user = await UserModel.findOne({ email: userEmail, role: 'PHARMACY' });
    if (!user) {
      return NextResponse.json({ error: 'Pharmacy not found' }, { status: 404 });
    }

    const pharmacyId = user._id;

    const soldLogs = await PharmacySoldLog.aggregate([
      { $match: { pharmacyId } },
      {
        $group: {
          _id: '$medicineId',
          totalSold: { $sum: '$quantity' },
        },
      },
    ]);

    const inventories = await PharmacyInventory.find({ hospitalId: pharmacyId }).lean();

   
    const medicineMap = new Map();

    soldLogs.forEach((log) => {
      medicineMap.set(log._id.toString(), {
        totalSold: log.totalSold,
        totalStock: 0,
      });
    });

    inventories.forEach((inv) => {
      const key = inv.medicineId.toString();
      const existing = medicineMap.get(key) || { totalSold: 0, totalStock: 0 };
      existing.totalStock = inv.totalStock;
      medicineMap.set(key, existing);
    });

    const medicineIds = Array.from(medicineMap.keys()).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const medicineDocs = await Medicine.find({ _id: { $in: medicineIds } }).lean();

    const stats = medicineDocs.map((med) => {
      const key = med._id.toString();
      const data = medicineMap.get(key);
      return {
        medicineId: key,
        brandName: med.brandName,
        totalSold: data.totalSold,
        totalStock: data.totalStock,
      };
    });

    

    return NextResponse.json(stats);
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
