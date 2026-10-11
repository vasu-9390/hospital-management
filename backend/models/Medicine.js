import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    medicineId: { type: String, required: true, unique: true },
    medicineName: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    batchNumber: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    expiryDate: { type: String, required: true },
    minimumStock: { type: Number, required: true, default: 30 }
  },
  { timestamps: true }
);

export default mongoose.model('Medicine', medicineSchema);
