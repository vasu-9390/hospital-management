import Payment from '../models/Payment.js';
import Bill from '../models/Bill.js';

export const createPayment = async (req, res, next) => {
  try {
    const { bill, patient, amount, paymentMethod, transactionId } = req.body;

    const count = await Payment.countDocuments();
    const paymentId = `PAY-${7000 + count + 1}`;

    const payment = await Payment.create({
      paymentId,
      bill,
      patient,
      amount,
      paymentMethod,
      paymentStatus: 'Completed',
      transactionId: transactionId || `TXN-${Date.now()}`,
      paymentDate: new Date().toLocaleString()
    });

    // Update associated Bill to Paid
    if (bill) {
      await Bill.findByIdAndUpdate(bill, { paymentStatus: 'Paid' });
    }

    const populated = await Payment.findById(payment._id)
      .populate('patient', 'name patientId')
      .populate('bill', 'billNumber totalAmount');

    res.status(201).json({ success: true, message: 'Payment recorded successfully', data: populated });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const { patient, paymentMethod } = req.query;
    const query = {};
    if (patient) query.patient = patient;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const payments = await Payment.find(query)
      .populate('patient', 'name patientId')
      .populate('bill', 'billNumber totalAmount')
      .sort({ createdAt: -1 });

    res.json({ success: true, message: 'Payments retrieved', data: payments });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('patient')
      .populate('bill');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment log not found' });
    }
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};
