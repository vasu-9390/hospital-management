import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHMSData } from '../../context/DataContext';

export const BookAppointmentModal = ({ isOpen, onClose }) => {
  const { patients, doctors, bookAppointment } = useHMSData();

  const [formData, setFormData] = useState({
    patientId: patients[0]?.id || '',
    doctorId: doctors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    reason: '',
    status: 'Scheduled'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPatient = patients.find((p) => p.id === formData.patientId) || patients[0];
    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId) || doctors[0];

    bookAppointment({
      patientId: selectedPatient.id,
      patientName: selectedPatient.fullName,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.fullName,
      department: selectedDoctor.department,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      reason: formData.reason || 'General Health Checkup'
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book New Appointment">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
          >
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.fullName} ({pat.id}) - Blood: {pat.bloodGroup}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Doctor & Specialty *</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.fullName} ({doc.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Appointment Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Appointment Date *</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Time Slot *</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'].map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Chief Complaint / Reason for Visit *</label>
          <textarea
            name="reason"
            rows={3}
            required
            value={formData.reason}
            onChange={handleChange}
            placeholder="Describe symptoms or purpose of appointment..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow transition-colors"
          >
            Confirm & Book Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
};
