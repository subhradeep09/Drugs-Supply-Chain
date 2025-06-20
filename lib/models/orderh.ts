import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: String,
  medicineId: String,
  medicineName: String,
  quantity: Number,
  price: Number,
  hospitalName: String,
  totalValue: Number,
  deliveryDate: String,
  orderDate: String,
  manufacturerStatus: { type: String, default: "Pending" }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
