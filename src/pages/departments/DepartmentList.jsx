import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DepartmentFormModal } from '../../components/forms/DepartmentFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Building2, Plus, Edit3, Trash2, Users, Stethoscope, MapPin } from 'lucide-react';

export const DepartmentList = () => {
  const { departments, deleteDepartment } = useHMSData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Hospital Departments</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Specialist medical wings, location blocks, staff allocations, and department leadership
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{dept.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingDept(dept)}
                    className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingId(dept.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-2">{dept.description}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Stethoscope className="w-3.5 h-3.5 text-primary-600" /> Head:
                </span>
                <span className="font-bold">{dept.headOfDepartment}</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" /> Location:
                </span>
                <span className="font-semibold text-slate-800">{dept.roomNumber}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold text-[11px]">
                  <Stethoscope className="w-3 h-3" /> {dept.totalDoctors} Doctors
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg font-bold text-[11px]">
                  <Users className="w-3 h-3" /> {dept.totalPatients} Active Patients
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DepartmentFormModal
        isOpen={isAddModalOpen || !!editingDept}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDept(null);
        }}
        initialData={editingDept}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deleteDepartment(deletingId)}
        title="Delete Department"
        message="Are you sure you want to delete this department? Make sure all associated medical staff are reassigned."
      />
    </div>
  );
};
