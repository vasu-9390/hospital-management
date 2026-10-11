import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, department, appointmentDate, appointmentTime, reason, status, notes } = req.body;

    // Check anti-double-booking constraint
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate,
      appointmentTime,
      status: { $ne: 'Cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Double-booking conflict! The selected doctor already has an active appointment at this date and time slot.'
      });
    }

    const count = await Appointment.countDocuments();
    const appointmentId = `APT-${3000 + count + 1}`;

    const appointment = await Appointment.create({
      appointmentId,
      patient,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      reason,
      status: status || 'Scheduled',
      notes: notes || ''
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email phone bloodGroup patientId')
      .populate('doctor', 'name specialization department doctorId');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: populatedAppointment
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { status, doctor, patient, date } = req.query;
    const query = {};

    if (status) query.status = status;
    if (doctor) query.doctor = doctor;
    if (patient) query.patient = patient;
    if (date) query.appointmentDate = date;

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone bloodGroup patientId')
      .populate('doctor', 'name specialization department doctorId')
      .sort({ createdAt: -1 });

    res.json({ success: true, message: 'Appointments retrieved', data: appointments });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const { appointmentDate, appointmentTime, doctor } = req.body;

    // Check double-booking if changing date/time
    if (appointmentDate || appointmentTime) {
      const current = await Appointment.findById(req.params.id);
      const targetDoc = doctor || current.doctor;
      const targetDate = appointmentDate || current.appointmentDate;
      const targetTime = appointmentTime || current.appointmentTime;

      const conflict = await Appointment.findOne({
        _id: { $ne: req.params.id },
        doctor: targetDoc,
        appointmentDate: targetDate,
        appointmentTime: targetTime,
        status: { $ne: 'Cancelled' }
      });

      if (conflict) {
        return res.status(400).json({
          success: false,
          message: 'Cannot reschedule slot. Doctor already has an appointment at this time.'
        });
      }
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('patient')
      .populate('doctor');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment updated', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};
