import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    availability: { type: String, required: true },
    consultationFee: { type: Number, default: 150 },
    status: { type: String, enum: ['Available', 'On Leave'], default: 'Available' }
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
