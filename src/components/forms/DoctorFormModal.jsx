import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useHMSData } from '../../context/DataContext';

export const DoctorFormModal = ({ isOpen, onClose, initialData = null }) => {
  const { addDoctor, updateDoctor, departments } = useHMSData();

  const [formData, setFormData] = useState({
    fullName: '',
    department: 'Cardiology',
    specialization: '',
    experience: '',
    phone: '',
    email: '',
    availability: 'Mon to Fri (09:00 AM - 04:00 PM)'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fullName: '',
        department: departments[0]?.name || 'Cardiology',
        specialization: '',
        experience: '',
        phone: '',
        email: '',
        availability: 'Mon to Fri (09:00 AM - 04:00 PM)'
      });
    }
  }, [initialData, isOpen, departments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateDoctor(initialData.id, formData);
    } else {
      addDoctor(formData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Doctor Profile' : 'Add New Medical Staff'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Doctor Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Dr. Alexander Vance"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Specialization *</label>
            <input
              type="text"
              name="specialization"
              required
              value={formData.specialization}
              onChange={handleChange}
              placeholder="e.g. Interventional Cardiology"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Experience *</label>
            <input
              type="text"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 10 Years"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@carepulse.org"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Weekly Availability Schedule *</label>
          <input
            type="text"
            name="availability"
            required
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g. Mon, Wed, Fri (09:00 AM - 04:00 PM)"
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
            {initialData ? 'Save Changes' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
