import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { CreatePrescriptionModal } from '../../components/forms/CreatePrescriptionModal';
import { BookAppointmentModal } from '../../components/forms/BookAppointmentModal';
import { Calendar, Users, FileText, CheckCircle2, Clock, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, patients, prescriptions, updateAppointmentStatus } = useHMSData();

  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const docName = user?.name || 'Dr. Sarah Jenkins';
  const myAppointments = appointments.filter(a => a.doctorName.toLowerCase().includes(docName.toLowerCase()) || true);

  const todayCount = myAppointments.filter(a => a.status === 'Confirmed' || a.status === 'Scheduled').length;
  const completedCount = myAppointments.filter(a => a.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header with Availability Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-primary-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black">{docName} Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-500/30 text-primary-200 border border-primary-400/30">
              Cardiology Consultant
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Welcome back, doctor! Manage today's outpatient schedule and issue e-prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
            <span className="text-xs font-semibold">Duty Status:</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className="flex items-center gap-1.5 font-bold text-xs"
            >
              {isAvailable ? (
                <>
                  <ToggleRight className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-400">Available</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-6 h-6 text-rose-400" />
                  <span className="text-rose-400">On Leave</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsRxModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Prescription
          </button>
        </div>
      </div>

      {/* Doctor KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Today's Consultation Queue" value={todayCount} icon={Calendar} color="blue" />
        <StatCard title="Completed Consultations" value={completedCount} icon={CheckCircle2} color="emerald" />
        <StatCard title="Prescriptions Issued" value={prescriptions.length} icon={FileText} color="purple" />
      </div>

      {/* Today's Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Today's Patient Schedule</h3>
            <p className="text-xs text-slate-500">Scheduled outpatient appointments for today</p>
          </div>
          <button
            onClick={() => setIsAptModalOpen(true)}
            className="text-xs font-bold text-primary-600 hover:underline"
          >
            + Add Slot
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {myAppointments.map((apt) => (
            <div key={apt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl font-bold text-xs">
                  {apt.time}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{apt.patientName}</h4>
                  <p className="text-xs text-slate-500">Reason: {apt.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    apt.status === 'Confirmed'
                      ? 'success'
                      : apt.status === 'Completed'
                      ? 'info'
                      : apt.status === 'Pending'
                      ? 'warning'
                      : 'gray'
                  }
                >
                  {apt.status}
                </Badge>

                {apt.status !== 'Completed' && (
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors"
                  >
                    Mark Completed
                  </button>
                )}
                <button
                  onClick={() => setIsRxModalOpen(true)}
                  className="px-3 py-1 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg border border-primary-200 transition-colors"
                >
                  Prescribe Rx
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreatePrescriptionModal isOpen={isRxModalOpen} onClose={() => setIsRxModalOpen(false)} />
      <BookAppointmentModal isOpen={isAptModalOpen} onClose={() => setIsAptModalOpen(false)} />
    </div>
  );
};
