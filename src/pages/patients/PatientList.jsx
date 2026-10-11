import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { PatientFormModal } from '../../components/forms/PatientFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { UserPlus, Eye, Edit3, Trash2, HeartPulse, FileText, Receipt, Calendar } from 'lucide-react';

export const PatientList = () => {
  const { patients, deletePatient, medicalHistory, appointments, bills, prescriptions } = useHMSData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);
  const [profileTab, setProfileTab] = useState('overview');

  const columns = [
    {
      header: 'Patient ID & Name',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.fullName}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
        </div>
      )
    },
    { header: 'Gender', accessor: 'gender' },
    { header: 'DOB', accessor: 'dob' },
    {
      header: 'Blood Group',
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
          {row.bloodGroup}
        </span>
      )
    },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Emergency Contact', accessor: 'emergencyContact' },
    {
      header: 'Status',
      render: (row) => <Badge variant="success">{row.status || 'Active'}</Badge>
    }
  ];

  const handleActions = (row) => (
    <>
      <button
        onClick={() => {
          setViewingPatient(row);
          setProfileTab('overview');
        }}
        className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title="View Full Profile & Medical History"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => setEditingPatient(row)}
        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
        title="Edit Patient Record"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => setDeletingId(row.id)}
        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        title="Delete Patient Record"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  // Filter patient history for modal view
  const patientHistoryData = medicalHistory.find((m) => m.patientId === viewingPatient?.id)?.visits || [];
  const patientApts = appointments.filter((a) => a.patientId === viewingPatient?.id || a.patientName === viewingPatient?.fullName);
  const patientRxs = prescriptions.filter((r) => r.patientId === viewingPatient?.id || r.patientName === viewingPatient?.fullName);
  const patientBills = bills.filter((b) => b.patientId === viewingPatient?.id || b.patientName === viewingPatient?.fullName);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Patient Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered patient directory, medical histories, diagnosis notes, and appointments
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <UserPlus className="w-4 h-4" /> Register New Patient
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={patients}
        searchPlaceholder="Search patients by name, email, phone, blood group..."
        filterKey="bloodGroup"
        filterOptions={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
        actions={handleActions}
      />

      {/* Patient Profile & Medical History Modal */}
      <Modal
        isOpen={!!viewingPatient}
        onClose={() => setViewingPatient(null)}
        title={`Patient Profile - ${viewingPatient?.fullName}`}
        maxWidth="max-w-4xl"
      >
        {viewingPatient && (
          <div className="space-y-6 text-xs">
            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 gap-4">
              <button
                onClick={() => setProfileTab('overview')}
                className={`pb-2.5 font-bold transition-colors border-b-2 ${
                  profileTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Overview & Contact
              </button>
              <button
                onClick={() => setProfileTab('history')}
                className={`pb-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  profileTab === 'history'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <HeartPulse className="w-4 h-4" /> Medical Visits History ({patientHistoryData.length})
              </button>
              <button
                onClick={() => setProfileTab('prescriptions')}
                className={`pb-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  profileTab === 'prescriptions'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4" /> Prescriptions ({patientRxs.length})
              </button>
              <button
                onClick={() => setProfileTab('bills')}
                className={`pb-2.5 font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  profileTab === 'bills'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Receipt className="w-4 h-4" /> Billing History ({patientBills.length})
              </button>
            </div>

            {/* Overview Tab */}
            {profileTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900 border-b pb-1">Personal Details</h4>
                  <p><strong className="text-slate-600">Patient ID:</strong> {viewingPatient.id}</p>
                  <p><strong className="text-slate-600">Full Name:</strong> {viewingPatient.fullName}</p>
                  <p><strong className="text-slate-600">Gender:</strong> {viewingPatient.gender}</p>
                  <p><strong className="text-slate-600">Date of Birth:</strong> {viewingPatient.dob}</p>
                  <p><strong className="text-slate-600">Blood Group:</strong> {viewingPatient.bloodGroup}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900 border-b pb-1">Contact & Emergency</h4>
                  <p><strong className="text-slate-600">Phone:</strong> {viewingPatient.phone}</p>
                  <p><strong className="text-slate-600">Email:</strong> {viewingPatient.email}</p>
                  <p><strong className="text-slate-600">Address:</strong> {viewingPatient.address}</p>
                  <p><strong className="text-slate-600">Emergency Contact:</strong> {viewingPatient.emergencyContact}</p>
                </div>
              </div>
            )}

            {/* Medical Visit History Tab */}
            {profileTab === 'history' && (
              <div className="space-y-4">
                {patientHistoryData.length > 0 ? (
                  patientHistoryData.map((visit) => (
                    <div key={visit.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-bold text-primary-700">{visit.date} • {visit.doctorName} ({visit.department})</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold">Visit ID: {visit.id}</span>
                      </div>
                      <p><strong>Symptoms:</strong> {visit.symptoms}</p>
                      <p><strong className="text-rose-700">Diagnosis:</strong> {visit.diagnosis}</p>
                      <p><strong>Treatment Provided:</strong> {visit.treatment}</p>
                      <p className="italic text-slate-500"><strong>Doctor Notes:</strong> "{visit.doctorNotes}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-slate-400">No prior recorded medical visits for this patient.</p>
                )}
              </div>
            )}

            {/* Prescriptions Tab */}
            {profileTab === 'prescriptions' && (
              <div className="space-y-3">
                {patientRxs.map((rx) => (
                  <div key={rx.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between font-bold text-slate-900 border-b pb-1 mb-2">
                      <span>Prescription {rx.id}</span>
                      <span className="text-slate-500">{rx.date}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1">
                      {rx.medicines.map((m, i) => (
                        <li key={i}>
                          <strong>{m.name}</strong> ({m.dosage}) - Frequency: {m.frequency}, Duration: {m.duration}. <em>{m.instructions}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Bills Tab */}
            {profileTab === 'bills' && (
              <div className="space-y-3">
                {patientBills.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{b.id} - Date: {b.date}</p>
                      <p className="text-slate-500">Total Billed: ${b.total.toFixed(2)}</p>
                    </div>
                    <Badge variant={b.paymentStatus === 'Paid' ? 'success' : 'danger'}>{b.paymentStatus}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Add / Edit Form Modal */}
      <PatientFormModal
        isOpen={isAddModalOpen || !!editingPatient}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingPatient(null);
        }}
        initialData={editingPatient}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletePatient(deletingId)}
        title="Delete Patient Record"
        message="Are you sure you want to permanently delete this patient record? All associated medical history will be archived."
      />
    </div>
  );
};
