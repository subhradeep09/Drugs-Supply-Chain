import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPod extends Document {
  orderId: Types.ObjectId;
  hospitalUserId: Types.ObjectId;
  podUrl: string;
  uploadedAt: Date;
}

const PodSchema = new Schema<IPod>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    hospitalUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    podUrl: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pod || mongoose.model<IPod>('Pod', PodSchema);
