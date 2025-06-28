// lib/models/Order.ts

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrder extends Document {
  userId: Types.ObjectId; // Reference to User
  orderId: string;
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' };
  medicineName: string;
  quantity: number;
  price: number;
  hospitalName: string;
  totalValue: number;
  deliveryDate: Date;
  orderDate: Date;
  manufacturerStatus: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: String,
    medicineId:{type: Schema.Types.ObjectId, ref: 'Medicine', required: true},
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

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
