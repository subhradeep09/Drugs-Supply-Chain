// lib/models/PharmacyOrder.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPharmacyOrder extends Document {
  userId: Types.ObjectId; // reference to User
  orderId: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  hospitalName: string;
  totalValue: number;
  deliveryDate: Date;
  orderDate: Date;
  manufacturerStatus: string;
}

const PharmacyOrderSchema = new Schema<IPharmacyOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: String,
    medicineId: String,
    medicineName: String,
    quantity: Number,
    price: Number,
    hospitalName: String,
    totalValue: Number,
    deliveryDate: Date,
    orderDate: Date,
    manufacturerStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.PharmacyOrder || mongoose.model<IPharmacyOrder>('PharmacyOrder', PharmacyOrderSchema);
