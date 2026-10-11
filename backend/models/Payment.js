import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Online'], required: true },
    paymentStatus: { type: String, enum: ['Completed', 'Failed', 'Pending'], default: 'Completed' },
    transactionId: { type: String, required: true },
    paymentDate: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
