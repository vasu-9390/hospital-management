import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    notificationId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'success', 'error'], default: 'info' },
    targetRole: { type: String, enum: ['Admin', 'Doctor', 'Patient', 'Staff', 'All'], default: 'All' },
    recipientUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
