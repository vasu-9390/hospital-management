import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { CreatePrescriptionModal } from '../../components/forms/CreatePrescriptionModal';
import { PrintablePrescription } from '../../components/invoice/PrintablePrescription';
import { FileText, Plus, Printer, Eye } from 'lucide-react';

export const PrescriptionList = () => {
  const { prescriptions } = useHMSData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);

  const columns = [
    {
      header: 'Rx ID & Date',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.id}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.date}</span>
        </div>
      )
    },
    {
      header: 'Patient Name',
      render: (row) => <span className="font-bold text-slate-900">{row.patientName}</span>
    },
    {
      header: 'Prescribing Physician',
      render: (row) => <span className="font-bold text-primary-700">{row.doctorName}</span>
    },
    {
      header: 'Prescribed Drugs',
      render: (row) => (
        <span className="text-slate-600 font-medium">
          {row.medicines.map((m) => m.name).join(', ')}
        </span>
      )
    }
  ];

  const handleActions = (row) => (
    <button
      onClick={() => setSelectedRx(row)}
      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg border border-emerald-200 transition-colors text-xs"
    >
      <Printer className="w-3.5 h-3.5" /> View / Print
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Prescription Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Electronic outpatient medical prescriptions, dosage details, and posology instructions
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Issue New Prescription
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={prescriptions}
        searchPlaceholder="Search prescriptions by patient, doctor, medicine..."
        actions={handleActions}
      />

      <CreatePrescriptionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <PrintablePrescription isOpen={!!selectedRx} onClose={() => setSelectedRx(null)} rx={selectedRx} />
    </div>
  );
};
