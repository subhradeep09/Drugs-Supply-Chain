import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodborder';
import POD from '@/lib/models/pod';
import Order from '@/lib/models/orderh'; // ⬅ Import hospital orders
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const orderId = formData.get('orderId')?.toString();
    const vendorId = formData.get('vendorId')?.toString();

    if (!file || file.type !== 'application/pdf' || !orderId) {
      return NextResponse.json({ error: 'Missing or invalid file/orderId' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await dbConnect();

    // ⬇ Fetch hospital name from the orderh collection using orderId
    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const hospitalName = order.hospitalName;

    // ⬇ Upload PDF to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'pod_files',
          resource_type: 'raw',
          format: 'pdf',
        },
        async (error, result) => {
          if (error || !result?.secure_url) {
            return reject(error || new Error('Cloudinary upload failed'));
          }

          try {
            const pod = await POD.create({
              orderId,
              hospitalName, // ✅ Store hospital name instead of ID
              vendorId,
              podUrl: result.secure_url,
            });
            resolve(pod);
          } catch (err) {
            reject(err);
          }
        }
      );

      bufferToStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json({ pod: uploaded }, { status: 200 });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
