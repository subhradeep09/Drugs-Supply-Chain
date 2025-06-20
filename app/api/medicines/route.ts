import dbConnect from '@/lib/db/mongodborder';
import Medicine from '@/lib/models/medicine';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const medicines = await Medicine.find({});
    return NextResponse.json(medicines);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching medicines' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    const parsedData = {
      ...data,
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
