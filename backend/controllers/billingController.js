import Bill from '../models/Bill.js';
import Payment from '../models/Payment.js';

export const createBill = async (req, res, next) => {
  try {
    const {
      patient,
      appointment,
      doctorName,
      consultationFee = 0,
      medicineCharges = 0,
      testCharges = 0,
      otherCharges = 0,
      discount = 0,
      tax = 0,
      paymentStatus = 'Pending',
      items = []
    } = req.body;

    const count = await Bill.countDocuments();
    const billNumber = `INV-${8000 + count + 1}`;

    // Backend auto-calculation of total amount
    const subtotal = Number(consultationFee) + Number(medicineCharges) + Number(testCharges) + Number(otherCharges);
    const totalAmount = Math.max(0, Number(subtotal) + Number(tax) - Number(discount));

    const bill = await Bill.create({
      billNumber,
      patient,
      appointment,
      doctorName: doctorName || 'Attending Physician',
      consultationFee,
      medicineCharges,
      testCharges,
      otherCharges,
      discount,
      tax,
      totalAmount,
      paymentStatus,
      items
    });

    const populated = await Bill.findById(bill._id).populate('patient', 'name patientId email phone');

    // If bill created as Paid, generate Payment record
    if (paymentStatus === 'Paid') {
      const payCount = await Payment.countDocuments();
      await Payment.create({
        paymentId: `PAY-${7000 + payCount + 1}`,
        bill: bill._id,
        patient,
        amount: totalAmount,
        paymentMethod: req.body.paymentMethod || 'Cash',
        paymentStatus: 'Completed',
        transactionId: `TXN-${Date.now()}`,
        paymentDate: new Date().toLocaleString()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

export const getBills = async (req, res, next) => {
  try {
    const { patient, status } = req.query;
    const query = {};
    if (patient) query.patient = patient;
    if (status) query.paymentStatus = status;

    const bills = await Bill.find(query)
      .populate('patient', 'name patientId email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, message: 'Invoices retrieved', data: bills });
  } catch (error) {
    next(error);
  }
};

export const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('patient').populate('appointment');
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};

export const updateBill = async (req, res, next) => {
  try {
    const current = await Bill.findById(req.params.id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const consultationFee = req.body.consultationFee !== undefined ? req.body.consultationFee : current.consultationFee;
    const medicineCharges = req.body.medicineCharges !== undefined ? req.body.medicineCharges : current.medicineCharges;
    const testCharges = req.body.testCharges !== undefined ? req.body.testCharges : current.testCharges;
    const otherCharges = req.body.otherCharges !== undefined ? req.body.otherCharges : current.otherCharges;
    const discount = req.body.discount !== undefined ? req.body.discount : current.discount;
    const tax = req.body.tax !== undefined ? req.body.tax : current.tax;

    const subtotal = Number(consultationFee) + Number(medicineCharges) + Number(testCharges) + Number(otherCharges);
    const totalAmount = Math.max(0, Number(subtotal) + Number(tax) - Number(discount));

    req.body.totalAmount = totalAmount;

    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('patient', 'name patientId email phone');

    res.json({ success: true, message: 'Invoice updated', data: updated });
  } catch (error) {
    next(error);
  }
};
