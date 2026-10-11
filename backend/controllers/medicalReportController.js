import MedicalReport from '../models/MedicalReport.js';

export const createMedicalReport = async (req, res, next) => {
  try {
    const report = await MedicalReport.create({
      ...req.body,
      reportDate: req.body.reportDate || new Date().toISOString().split('T')[0]
    });
    res.status(201).json({ success: true, message: 'Medical report filed', data: report });
  } catch (error) {
    next(error);
  }
};

export const getMedicalReports = async (req, res, next) => {
  try {
    const { patient, doctor } = req.query;
    const query = {};
    if (patient) query.patient = patient;
    if (doctor) query.doctor = doctor;

    const reports = await MedicalReport.find(query)
      .populate('patient', 'name patientId')
      .populate('doctor', 'name specialization')
      .sort({ reportDate: -1 });

    res.json({ success: true, message: 'Reports retrieved', data: reports });
  } catch (error) {
    next(error);
  }
};

export const getMedicalReportById = async (req, res, next) => {
  try {
    const report = await MedicalReport.findById(req.params.id).populate('patient').populate('doctor');
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

export const updateMedicalReport = async (req, res, next) => {
  try {
    const updated = await MedicalReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, message: 'Report updated', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalReport = async (req, res, next) => {
  try {
    const report = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, message: 'Report deleted' });
  } catch (error) {
    next(error);
  }
};
