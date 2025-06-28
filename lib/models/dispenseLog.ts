import mongoose from 'mongoose';

const DispenseLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  medicineId: { type: mongoose.Types.ObjectId, ref: 'Medicine', required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  recipient: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.DispenseLog || mongoose.model('DispenseLog', DispenseLogSchema);
