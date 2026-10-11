import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    reportType: { type: String, required: true },
    reportTitle: { type: String, required: true },
    description: { type: String, required: true },
    reportDate: { type: String, required: true },
    fileUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('MedicalReport', medicalReportSchema);
