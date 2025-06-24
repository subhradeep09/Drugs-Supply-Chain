import mongoose, { Schema, Document } from 'mongoose'

export interface IVerification extends Document {
  userId: mongoose.Types.ObjectId
  licenseNumber: string
  organization: string
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: Date
  reviewedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const verificationSchema = new Schema<IVerification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One verification per user
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
    },
    applicationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Includes createdAt and updatedAt
  }
)

// Delete the model if it exists to prevent OverwriteModelError in dev
export const Verification =
  mongoose.models?.Verification ||
  mongoose.model<IVerification>('Verification', verificationSchema)
