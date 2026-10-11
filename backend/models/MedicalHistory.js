import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    diagnosis: { type: String, required: true },
    symptoms: { type: String, required: true },
    treatment: { type: String, required: true },
    notes: { type: String, default: '' },
    visitDate: { type: String, required: true },
    prescriptions: [{ type: String }],
    reports: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('MedicalHistory', medicalHistorySchema);
