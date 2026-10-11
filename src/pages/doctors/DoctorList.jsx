import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { DoctorFormModal } from '../../components/forms/DoctorFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Stethoscope, Eye, Edit3, Trash2, Calendar, Phone, Mail, Award } from 'lucide-react';

export const DoctorList = () => {
  const { doctors, deleteDoctor, departments } = useHMSData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingDoctor, setViewingDoctor] = useState(null);

  const columns = [
    {
      header: 'Doctor Name & ID',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.fullName}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Department',
      render: (row) => (
        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-50 text-primary-700 border border-primary-200">
          {row.department}
        </span>
      )
    },
    { header: 'Specialization', accessor: 'specialization' },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Weekly Availability', accessor: 'availability' },
    {
      header: 'Duty Status',
      render: (row) => (
        <Badge variant={row.status === 'Available' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      )
    }
  ];

  const handleActions = (row) => (
    <>
      <button
        onClick={() => setViewingDoctor(row)}
        className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title="View Doctor Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => setEditingDoctor(row)}
        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
        title="Edit Doctor Profile"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => setDeletingId(row.id)}
        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        title="Delete Doctor Record"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Doctor Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Medical staff rosters, specializations, consulting hours, and availability
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <Stethoscope className="w-4 h-4" /> Add Medical Staff
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={doctors}
        searchPlaceholder="Search doctors by name, specialization, department..."
        filterKey="department"
        filterOptions={departments.map((d) => d.name)}
        actions={handleActions}
      />

      {/* Doctor Profile View Modal */}
      <Modal
        isOpen={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        title={`Doctor Profile - ${viewingDoctor?.fullName}`}
      >
        {viewingDoctor && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-2xl border border-primary-100">
              <div className="p-3 bg-primary-600 text-white rounded-xl">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{viewingDoctor.fullName}</h3>
                <p className="text-primary-700 font-bold">{viewingDoctor.department} Department</p>
                <p className="text-slate-500">{viewingDoctor.specialization}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Experience</span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" /> {viewingDoctor.experience}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Duty Status</span>
                <p className="font-bold text-slate-800">
                  <Badge variant={viewingDoctor.status === 'Available' ? 'success' : 'danger'}>
                    {viewingDoctor.status}
                  </Badge>
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Availability</span>
              <p className="font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" /> {viewingDoctor.availability}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Details</span>
              <p className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-slate-400" /> {viewingDoctor.phone}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400" /> {viewingDoctor.email}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Add / Edit Doctor Modal */}
      <DoctorFormModal
        isOpen={isAddModalOpen || !!editingDoctor}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDoctor(null);
        }}
        initialData={editingDoctor}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deleteDoctor(deletingId)}
        title="Delete Doctor Record"
        message="Are you sure you want to remove this doctor from the hospital registry?"
      />
    </div>
  );
};
