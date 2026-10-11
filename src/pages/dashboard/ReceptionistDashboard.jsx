import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { PatientFormModal } from '../../components/forms/PatientFormModal';
import { BookAppointmentModal } from '../../components/forms/BookAppointmentModal';
import { CreateBillModal } from '../../components/forms/CreateBillModal';
import { UserPlus, CalendarPlus, FilePlus, Users, Calendar, Stethoscope, CheckCircle, Clock } from 'lucide-react';

export const ReceptionistDashboard = () => {
  const { patients, doctors, appointments, updateAppointmentStatus } = useHMSData();

  const [isPatModalOpen, setIsPatModalOpen] = useState(false);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);

  const todayCount = appointments.filter(a => a.date === '2026-08-31' || a.date === new Date().toISOString().split('T')[0]).length || 3;
  const pendingCheckins = appointments.filter(a => a.status === 'Scheduled' || a.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Receptionist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Reception & Desk Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Patient registration, appointment scheduling desk, doctor status, and quick billing counter
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsPatModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" /> Register Patient
          </button>
          <button
            onClick={() => setIsAptModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <CalendarPlus className="w-4 h-4" /> Book Slot
          </button>
          <button
            onClick={() => setIsBillModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <FilePlus className="w-4 h-4" /> Issue Bill
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={patients.length} icon={Users} color="blue" />
        <StatCard title="Today's Desk Queue" value={todayCount} icon={Calendar} color="teal" />
        <StatCard title="Pending Check-ins" value={pendingCheckins} icon={Clock} color="amber" />
        <StatCard title="Active Doctors" value={doctors.filter(d => d.status === 'Available').length} icon={Stethoscope} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Check-in Desk */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Today's Appointment Desk</h3>
            <span className="text-xs text-slate-400">Click to confirm patient check-in</span>
          </div>

          <div className="divide-y divide-slate-100">
            {appointments.map((apt) => (
              <div key={apt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{apt.patientName} ({apt.patientId})</h4>
                  <p className="text-slate-500">Doctor: {apt.doctorName} • Dept: {apt.department}</p>
                  <p className="text-slate-400">Slot: {apt.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={apt.status === 'Confirmed' ? 'success' : apt.status === 'Scheduled' ? 'info' : 'warning'}>
                    {apt.status}
                  </Badge>
                  {apt.status === 'Scheduled' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                      className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                    >
                      Confirm Check-in
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Availability Roster */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Doctor Duty Status</h3>
          <div className="space-y-3">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{doc.fullName}</p>
                  <p className="text-[10px] text-slate-500">{doc.department}</p>
                </div>
                <Badge variant={doc.status === 'Available' ? 'success' : 'danger'}>
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PatientFormModal isOpen={isPatModalOpen} onClose={() => setIsPatModalOpen(false)} />
      <BookAppointmentModal isOpen={isAptModalOpen} onClose={() => setIsAptModalOpen(false)} />
      <CreateBillModal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} />
    </div>
  );
};
