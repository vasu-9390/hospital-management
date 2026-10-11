import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    billNumber: { type: String, required: true, unique: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    doctorName: { type: String, required: true },
    consultationFee: { type: Number, default: 0 },
    medicineCharges: { type: Number, default: 0 },
    testCharges: { type: Number, default: 0 },
    otherCharges: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Unpaid'], default: 'Pending' },
    items: [
      {
        description: String,
        category: String,
        amount: Number
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Bill', billSchema);
