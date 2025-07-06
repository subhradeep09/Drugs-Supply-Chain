// lib/models/DispenseLog.ts

import mongoose, { Schema, Document } from 'mongoose';

const DispenseLogSchema = new Schema({
  medicineName: { type: String, required: true },
  recipient: { type: String, required: true },
  quantity: { type: Number, required: true },
  dispatchedBatches: [
    {
      batchId: { type: Schema.Types.ObjectId },
      batchNumber: String,
      quantity: Number,
      expiryDate: Date,
    }
  ],
  dispensedAt: { type: Date, default: Date.now },
});

export default mongoose.models.DispenseLog ||
  mongoose.model('DispenseLog', DispenseLogSchema);        
