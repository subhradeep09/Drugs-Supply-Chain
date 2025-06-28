// app/api/vendor-medicine/route.ts

import dbConnect from '@/lib/db/mongodborder';
import Medicine from '@/lib/models/medicine';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const medicines = await Medicine.find({ userId: session.user._id || session.user.id }); 
    // console.log("Medicines fetched:", medicines);
    // adjust if your session user stores `_id` or `id`
    return NextResponse.json(medicines);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching medicines' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const parsedData = {
      ...data,
      userId: session.user._id || session.user.id, // make sure your session includes user ID
      mrp: parseFloat(data.mrp),
      offerPrice: parseFloat(data.offerPrice),
      gst: parseFloat(data.gst),
      stockQuantity: parseInt(data.stockQuantity),
      minOrderQuantity: parseInt(data.minOrderQuantity),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
    };

    const medicine = new Medicine(parsedData);
    await medicine.save();

    return NextResponse.json({ message: 'Medicine added successfully!' }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving medicine:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
