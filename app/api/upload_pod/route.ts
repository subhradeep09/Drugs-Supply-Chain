import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/db/mongodborder';
import  Pod from '@/lib/models/pod';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { User } from '@/lib/models/User';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const orderId = formData.get('orderId') as string;
    const hospitalName = formData.get('hospitalId') as string;
    const vendorId = formData.get('vendorId') as string;

    if (!file || !orderId || !hospitalName || !vendorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Find hospital user based on name
    await dbConnect();
    const hospitalUser = await User.findOne({ name: hospitalName });
    if (!hospitalUser) {
      return NextResponse.json({ error: 'Hospital user not found' }, { status: 404 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'pods', format: 'pdf' },
      async (error, result) => {
        if (error || !result) {
          console.error('Cloudinary upload error:', error);
          return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
        }

        const podData = {
          orderId,
          hospitalName,
          hospitaluserId: hospitalUser._id, // ✅ ADD THIS FIELD
          vendorId,
          podUrl: result.secure_url,
        };

        const pod = new Pod(podData);
        await pod.save();

        return NextResponse.json({ message: 'POD uploaded successfully' }, { status: 200 });
      }
    );

    Readable.from(buffer).pipe(stream);
    return new Promise((resolve) => {
      stream.on('end', () => {
        resolve(new Response('OK', { status: 200 }));
      });
    });
  } catch (err) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
