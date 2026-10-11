import React from 'react';
import { Printer, Activity, Pill } from 'lucide-react';
import { Modal } from '../common/Modal';

export const PrintablePrescription = ({ isOpen, onClose, rx }) => {
  if (!rx) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Prescription - ${rx.id}`} maxWidth="max-w-3xl">
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs shadow transition-all"
        >
          <Printer className="w-4 h-4" />
          Print Prescription
        </button>
      </div>

      <div className="printable-area p-8 bg-white rounded-xl border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-primary-600 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-600 text-white rounded-xl">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">CarePulse Specialty Clinic</h2>
              <p className="text-xs text-slate-500">Outpatient Medical Prescription</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-bold text-primary-700">{rx.doctorName}</h3>
            <p className="text-xs text-slate-500">Reg. No: MED-998412</p>
            <p className="text-xs text-slate-500">Date: {rx.date}</p>
          </div>
        </div>

        {/* Patient Bar */}
        <div className="grid grid-cols-2 gap-4 my-4 p-3 bg-slate-50 rounded-lg text-xs">
          <div>
            <span className="font-semibold text-slate-500">Patient Name: </span>
            <strong className="text-slate-900">{rx.patientName}</strong>
          </div>
          <div>
            <span className="font-semibold text-slate-500">Rx Ref No: </span>
            <strong className="text-slate-900">{rx.id}</strong>
          </div>
        </div>

        {/* Prescription Icon */}
        <div className="flex items-center gap-2 my-4 text-primary-700 font-extrabold text-2xl">
          <Pill className="w-7 h-7" />
          <span>Rx</span>
        </div>

        {/* Medicines Table */}
        <table className="w-full text-left text-xs mb-8">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Medicine Name & Strength</th>
              <th className="py-2.5 px-3">Dosage</th>
              <th className="py-2.5 px-3">Frequency</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3">Instructions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rx.medicines?.map((med, idx) => (
              <tr key={idx}>
                <td className="py-3 px-3 font-bold text-slate-900">{med.name}</td>
                <td className="py-3 px-3 text-slate-700">{med.dosage}</td>
                <td className="py-3 px-3 text-slate-700 font-medium">{med.frequency}</td>
                <td className="py-3 px-3 text-slate-700">{med.duration}</td>
                <td className="py-3 px-3 text-slate-600 italic">{med.instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Doctor Signature */}
        <div className="flex justify-end pt-12">
          <div className="text-center w-48 border-t border-slate-400 pt-2">
            <p className="font-bold text-xs text-slate-900">{rx.doctorName}</p>
            <p className="text-[10px] text-slate-500">Authorized Medical Practitioner</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
