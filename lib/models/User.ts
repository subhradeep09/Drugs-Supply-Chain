import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'HOSPITAL' | 'PHARMACY' | 'VENDOR'
  organization: string
  isVerified: boolean
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  verificationDetails?: Record<string, any>
  verificationMatchScore?: number
  rejectionReason?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR'],
      required: [true, 'Role is required'],
    },
    organization: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    verificationDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
    verificationMatchScore: {
      type: Number,
      default: 0,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.index({ email: 1 }, { unique: true })

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)