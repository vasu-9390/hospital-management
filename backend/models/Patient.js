import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    status: { type: String, default: 'Active' }
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);
