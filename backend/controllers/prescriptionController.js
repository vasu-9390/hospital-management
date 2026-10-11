import Prescription from '../models/Prescription.js';

export const createPrescription = async (req, res, next) => {
  try {
    const count = await Prescription.countDocuments();
    const prescriptionId = `RX-${5000 + count + 1}`;

    const prescription = await Prescription.create({
      ...req.body,
      prescriptionId,
      prescriptionDate: req.body.prescriptionDate || new Date().toISOString().split('T')[0]
    });

    const populated = await Prescription.findById(prescription._id)
      .populate('patient', 'name patientId bloodGroup')
      .populate('doctor', 'name specialization department');

    res.status(201).json({ success: true, message: 'Prescription created', data: populated });
  } catch (error) {
    next(error);
  }
};

export const getPrescriptions = async (req, res, next) => {
  try {
    const { patient, doctor } = req.query;
    const query = {};
    if (patient) query.patient = patient;
    if (doctor) query.doctor = doctor;

    const prescriptions = await Prescription.find(query)
      .populate('patient', 'name patientId bloodGroup')
      .populate('doctor', 'name specialization department')
      .sort({ createdAt: -1 });

    res.json({ success: true, message: 'Prescriptions retrieved', data: prescriptions });
  } catch (error) {
    next(error);
  }
};

export const getPrescriptionById = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient')
      .populate('doctor');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    res.json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

export const updatePrescription = async (req, res, next) => {
  try {
    const updated = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    res.json({ success: true, message: 'Prescription updated', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    res.json({ success: true, message: 'Prescription deleted' });
  } catch (error) {
    next(error);
  }
};
