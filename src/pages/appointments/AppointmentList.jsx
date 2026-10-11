import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { BookAppointmentModal } from '../../components/forms/BookAppointmentModal';
import { CalendarPlus, Check, XCircle, CheckCircle2, Clock } from 'lucide-react';

export const AppointmentList = () => {
  const { appointments, updateAppointmentStatus } = useHMSData();

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const columns = [
    {
      header: 'Appt ID & Date',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.date} at {row.time}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Patient Name',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.patientName}</p>
          <span className="text-[10px] text-slate-500">ID: {row.patientId}</span>
        </div>
      )
    },
    {
      header: 'Assigned Doctor & Dept',
      render: (row) => (
        <div>
          <p className="font-bold text-primary-700">{row.doctorName}</p>
          <span className="text-[10px] text-slate-500">{row.department}</span>
        </div>
      )
    },
    { header: 'Chief Complaint', accessor: 'reason' },
    {
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Confirmed'
              ? 'success'
              : row.status === 'Completed'
              ? 'purple'
              : row.status === 'Scheduled'
              ? 'info'
              : row.status === 'Pending'
              ? 'warning'
              : 'danger'
          }
        >
          {row.status}
        </Badge>
      )
    }
  ];

  const handleActions = (row) => (
    <div className="flex items-center gap-1">
      {row.status === 'Scheduled' && (
        <button
          onClick={() => updateAppointmentStatus(row.id, 'Confirmed')}
          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Confirm Slot"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
      {row.status !== 'Completed' && row.status !== 'Cancelled' && (
        <button
          onClick={() => updateAppointmentStatus(row.id, 'Completed')}
          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          title="Mark Completed"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
      )}
      {row.status !== 'Cancelled' && (
        <button
          onClick={() => updateAppointmentStatus(row.id, 'Cancelled')}
          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Cancel Appointment"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Appointment Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Outpatient consultation bookings, doctor schedules, and status workflows
          </p>
        </div>
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <CalendarPlus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={appointments}
        searchPlaceholder="Search appointments by patient, doctor, department..."
        filterKey="status"
        filterOptions={['Scheduled', 'Confirmed', 'Completed', 'Pending', 'Cancelled']}
        actions={handleActions}
      />

      <BookAppointmentModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </div>
  );
};
