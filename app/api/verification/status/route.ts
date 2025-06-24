// /api/verification/status.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import dbConnect from '@/lib/db/mongodborder'
import { Verification } from '@/lib/models/Verification'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?._id) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  }

  await dbConnect()
  const record = await Verification.findOne({ userId: session.user._id })

  if (!record) {
    console.log("no findone");
    
    return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  }

  return new Response(
    JSON.stringify({
      applicationStatus: record.applicationStatus?.toUpperCase(), // Ensure uppercase for frontend usage
      hasApplied: true,
    }),
    { status: 200 }
  )
}
