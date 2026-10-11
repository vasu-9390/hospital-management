import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true, unique: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    department: { type: String, required: true },
    appointmentDate: { type: String, required: true }, // Format YYYY-MM-DD
    appointmentTime: { type: String, required: true }, // Format e.g. 10:30 AM
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'Confirmed', 'Completed', 'Pending', 'Cancelled'],
      default: 'Scheduled'
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

// Compound index to prevent double-booking for the same doctor at the same date and time
appointmentSchema.index({ doctor: 1, appointmentDate: 1, appointmentTime: 1 }, { unique: false });

export default mongoose.model('Appointment', appointmentSchema);
