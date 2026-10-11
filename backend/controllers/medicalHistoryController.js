import MedicalHistory from '../models/MedicalHistory.js';

export const getPatientMedicalHistory = async (req, res, next) => {
  try {
    const history = await MedicalHistory.find({ patient: req.params.id })
      .populate('doctor', 'name specialization department')
      .sort({ visitDate: -1 });

    res.json({ success: true, message: 'Medical history retrieved', data: history });
  } catch (error) {
    next(error);
  }
};

export const createMedicalHistory = async (req, res, next) => {
  try {
    const history = await MedicalHistory.create(req.body);
    const populated = await MedicalHistory.findById(history._id).populate('doctor', 'name specialization');
    res.status(201).json({ success: true, message: 'Medical history entry created', data: populated });
  } catch (error) {
    next(error);
  }
};

export const getMedicalHistoryById = async (req, res, next) => {
  try {
    const history = await MedicalHistory.findById(req.params.id).populate('patient').populate('doctor');
    if (!history) {
      return res.status(404).json({ success: false, message: 'Medical history record not found' });
    }
    res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const updateMedicalHistory = async (req, res, next) => {
  try {
    const updated = await MedicalHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Medical history updated', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalHistory = async (req, res, next) => {
  try {
    const record = await MedicalHistory.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    next(error);
  }
};
