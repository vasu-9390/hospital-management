import mongoose from 'mongoose';

const pharmacyTransactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    transactionType: { type: String, enum: ['Sale', 'Issue', 'Restock'], required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    items: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('PharmacyTransaction', pharmacyTransactionSchema);
