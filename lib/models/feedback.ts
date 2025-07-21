import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFeedback extends Document {
  userId: Types.ObjectId;       // Reference to the user submitting feedback
  role: string;                 // Role of the user (e.g., 'pharmacy')
  message: string;              // Feedback message content
  createdAt: Date;              // Timestamp of feedback
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
      required: true,
      enum: ['pharmacy', 'hospital', 'manufacturer', 'admin'],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
