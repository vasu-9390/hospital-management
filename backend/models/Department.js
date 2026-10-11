import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    departmentId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    headOfDepartment: { type: String, required: true },
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    totalDoctors: { type: Number, default: 0 },
    totalPatients: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Department', departmentSchema);
