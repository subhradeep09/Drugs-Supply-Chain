import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'HOSPITAL' | 'PHARMACY' | 'VENDOR'
  organization: string
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
  },
  {
    timestamps: true,
  }
)

// Create indexes
userSchema.index({ email: 1 }, { unique: true })

// Delete the model if it exists to prevent OverwriteModelError
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema) 