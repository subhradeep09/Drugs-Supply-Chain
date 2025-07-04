import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import Pod from '@/lib/models/pod';

export async function GET() {
  try {
    await dbConnect();

    const pods = await Pod.find()
      .populate({
        path: 'orderId',
        select: 'orderId hospitalName medicineName',
      })
      .populate({
        path: 'hospitalUserId',
        select: 'name email organization',
      })
      .lean();

    const enrichedPods = pods.map((pod) => ({
      _id: pod._id,
      podUrl: pod.podUrl,
      uploadedAt: pod.uploadedAt,
      hospital: pod.hospitalUserId?.name || 'Unknown',
      hospitalEmail: pod.hospitalUserId?.email || '',
      hospitalOrg: pod.hospitalUserId?.organization || '',
      orderId: pod.orderId?.orderId || '',
      hospitalName: pod.orderId?.hospitalName || '',
      medicineName: pod.orderId?.medicineName || '',
    }));

    return NextResponse.json(enrichedPods);
  } catch (error) {
    console.error('Error in get_pods:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
