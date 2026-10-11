import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHMSData } from '../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';

export const CreatePrescriptionModal = ({ isOpen, onClose }) => {
  const { patients, doctors, pharmacy, addPrescription } = useHMSData();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [medicines, setMedicines] = useState([
    { name: pharmacy[0]?.name || 'Paracetamol 650mg', dosage: '650mg', frequency: '1-0-1 (Bid)', duration: '5 Days', instructions: 'Take after meals' }
  ]);

  const handleAddMedicineRow = () => {
    setMedicines([
      ...medicines,
      { name: pharmacy[0]?.name || 'Paracetamol 650mg', dosage: '500mg', frequency: '1-0-0 (Morning)', duration: '7 Days', instructions: 'Take with glass of water' }
    ]);
  };

  const handleRemoveMedicineRow = (index) => {
    if (medicines.length === 1) return;
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selPat = patients.find((p) => p.id === patientId) || patients[0];
    const selDoc = doctors.find((d) => d.id === doctorId) || doctors[0];

    addPrescription({
      patientId: selPat.id,
      patientName: selPat.fullName,
      doctorId: selDoc.id,
      doctorName: selDoc.fullName,
      medicines
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Medical Prescription" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>{pat.fullName} ({pat.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Prescribing Doctor *</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.fullName} ({doc.department})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Medicines Section */}
        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Medicines & Posology</h4>
            <button
              type="button"
              onClick={handleAddMedicineRow}
              className="flex items-center gap-1 text-primary-600 font-bold hover:text-primary-700"
            >
              <Plus className="w-4 h-4" /> Add Medicine
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 relative">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Medicine Name</label>
                    <select
                      value={med.name}
                      onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                    >
                      {pharmacy.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Dosage Strength</label>
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                      placeholder="e.g. 500mg"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Frequency</label>
                    <input
                      type="text"
                      value={med.frequency}
                      onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                      placeholder="e.g. 1-0-1 (Bid)"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Duration</label>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                      placeholder="e.g. 7 Days"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Special Instructions</label>
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                        placeholder="Take before/after meals..."
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicineRow(idx)}
                        className="mt-4 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                        title="Remove medicine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow transition-colors"
          >
            Issue Prescription
          </button>
        </div>
      </form>
    </Modal>
  );
};
