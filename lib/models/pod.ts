// ✅ lib/models/pod.ts
import mongoose from 'mongoose';

const podSchema = new mongoose.Schema({
  orderId: String,
  hospitalName: String, // ✅ updated
  vendorId: String,
  podUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Pod || mongoose.model('Pod', podSchema);
