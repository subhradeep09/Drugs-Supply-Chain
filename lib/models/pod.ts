// lib/models/Pod.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPod extends Document {
  userId: Types.ObjectId; // uploader user
  orderId: string;
  hospitalName: string;
  vendorId: string;
  podUrl: string;
  uploadedAt: Date;

}

const podSchema = new Schema<IPod>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: String,
    hospitalName: String,
    vendorId: String,
    podUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pod || mongoose.model<IPod>('Pod', podSchema);
