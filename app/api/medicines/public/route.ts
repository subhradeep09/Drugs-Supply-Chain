// app/api/medicines/public/route.ts
import dbConnect from '@/lib/db/mongodborder';
import Medicine from '@/lib/models/medicine';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const medicines = await Medicine.find({}); // 🔓 All medicines
    return NextResponse.json(medicines);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching public medicines' }, { status: 500 });
  }
}
