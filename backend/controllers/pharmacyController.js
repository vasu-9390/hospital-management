import Medicine from '../models/Medicine.js';
import PharmacyTransaction from '../models/PharmacyTransaction.js';

export const getMedicines = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { medicineName: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;

    const medicines = await Medicine.find(query).sort({ medicineName: 1 });
    res.json({ success: true, message: 'Medicines retrieved', data: medicines });
  } catch (error) {
    next(error);
  }
};

export const getMedicineById = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine item not found' });
    }
    res.json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

export const createMedicine = async (req, res, next) => {
  try {
    const count = await Medicine.countDocuments();
    const medicineId = `MED-${400 + count + 1}`;

    const medicine = await Medicine.create({
      ...req.body,
      medicineId
    });

    res.status(201).json({ success: true, message: 'Medicine added to inventory', data: medicine });
  } catch (error) {
    next(error);
  }
};

export const updateMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine item not found' });
    }
    res.json({ success: true, message: 'Medicine updated', data: medicine });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine item not found' });
    }
    res.json({ success: true, message: 'Medicine removed' });
  } catch (error) {
    next(error);
  }
};

export const getLowStockMedicines = async (req, res, next) => {
  try {
    const lowStockItems = await Medicine.find({ $expr: { $lte: ['$quantity', '$minimumStock'] } });
    res.json({ success: true, message: 'Low stock items retrieved', data: lowStockItems });
  } catch (error) {
    next(error);
  }
};

// Pharmacy Transactions (Auto updates stock)
export const createPharmacyTransaction = async (req, res, next) => {
  try {
    const { transactionType, patient, items } = req.body;

    const count = await PharmacyTransaction.countDocuments();
    const transactionId = `TX-${6000 + count + 1}`;

    let calculatedTotal = 0;
    const itemLogs = [];

    // Loop items & adjust stock
    for (const item of items) {
      const med = await Medicine.findById(item.medicine);
      if (!med) {
        return res.status(404).json({ success: false, message: `Medicine ID ${item.medicine} not found` });
      }

      if (transactionType === 'Sale' || transactionType === 'Issue') {
        if (med.quantity < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${med.medicineName}. Available: ${med.quantity}, Requested: ${item.quantity}`
          });
        }
        med.quantity -= item.quantity;
      } else if (transactionType === 'Restock') {
        med.quantity += item.quantity;
      }

      await med.save();

      const lineTotal = item.quantity * (item.unitPrice || med.price);
      calculatedTotal += lineTotal;

      itemLogs.push({
        medicine: med._id,
        medicineName: med.medicineName,
        quantity: item.quantity,
        unitPrice: item.unitPrice || med.price,
        total: lineTotal
      });
    }

    const transaction = await PharmacyTransaction.create({
      transactionId,
      transactionType,
      patient,
      items: itemLogs,
      totalAmount: calculatedTotal,
      processedBy: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: 'Pharmacy transaction logged and inventory stock updated',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

export const getPharmacyTransactions = async (req, res, next) => {
  try {
    const transactions = await PharmacyTransaction.find()
      .populate('patient', 'name patientId')
      .populate('processedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, message: 'Pharmacy transactions retrieved', data: transactions });
  } catch (error) {
    next(error);
  }
};
