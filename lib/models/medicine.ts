import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  brandName: String,
  genericName: String,
  category: String,
  dosageForm: String,
  strength: String,
  packSize: String,
  licenseNumber: String,
  batchNumber: String,
  expiryDate: Date,
  manufacturingDate: Date,
  approvalNumber: String,
  mrp: Number,
  offerPrice: Number,
  gst: Number,
  stockQuantity: Number,
  minOrderQuantity: Number,
  shortDescription: String,
  detailedDescription: String,
  productImage: String,
  packagingImage: String,
  labReports: String,
  storageConditions: String,
  shippingWeight: String,
  dimensions: String,
  brochure: String,
  msds: String,
  certifications: String,
}, { timestamps: true });

export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
