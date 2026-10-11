import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { PrintableInvoice } from '../../components/invoice/PrintableInvoice';
import { PrintablePrescription } from '../../components/invoice/PrintablePrescription';
import { BookAppointmentModal } from '../../components/forms/BookAppointmentModal';
import { Calendar, FileText, Receipt, HeartPulse, Printer, Plus } from 'lucide-react';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, prescriptions, bills, medicalHistory } = useHMSData();

  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedRx, setSelectedRx] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const patientName = user?.name || 'Eleanor Vance';
  const myAppointments = appointments.filter(a => a.patientName.toLowerCase().includes(patientName.toLowerCase()) || true);
  const myPrescriptions = prescriptions.filter(p => p.patientName.toLowerCase().includes(patientName.toLowerCase()) || true);
  const myBills = bills.filter(b => b.patientName.toLowerCase().includes(patientName.toLowerCase()) || true);

  return (
    <div className="space-y-6">
      {/* Patient Welcome Hero */}
      <div className="bg-gradient-to-r from-teal-700 to-primary-800 p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-teal-200">Patient Health Portal</span>
          <h1 className="text-2xl font-black mt-0.5">Welcome back, {patientName}!</h1>
          <p className="text-xs text-slate-200 mt-1">
            Access your medical history, scheduled consultations, active prescriptions, and billing receipts.
          </p>
        </div>
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-teal-800 hover:bg-teal-50 rounded-2xl text-xs font-extrabold shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Book New Appointment
        </button>
      </div>

      {/* Patient Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Upcoming Appointments" value={myAppointments.length} icon={Calendar} color="blue" />
        <StatCard title="Active Prescriptions" value={myPrescriptions.length} icon={FileText} color="teal" />
        <StatCard title="Total Bills & Payments" value={myBills.length} icon={Receipt} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Your Scheduled Visits</h3>
            <button onClick={() => setIsBookModalOpen(true)} className="text-xs font-bold text-teal-600 hover:underline">
              + Book Slot
            </button>
          </div>
          <div className="space-y-3">
            {myAppointments.map((apt) => (
              <div key={apt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{apt.doctorName}</h4>
                  <p className="text-[11px] text-slate-500">{apt.department} • {apt.reason}</p>
                  <p className="text-[10px] text-teal-700 font-semibold mt-1">Date: {apt.date} at {apt.time}</p>
                </div>
                <Badge variant={apt.status === 'Confirmed' ? 'success' : 'info'}>{apt.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Active Prescriptions Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Active Prescriptions</h3>
            <span className="text-xs text-slate-400">Issued by Doctors</span>
          </div>
          <div className="space-y-3">
            {myPrescriptions.map((rx) => (
              <div key={rx.id} className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rx.doctorName} ({rx.date})</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {rx.medicines.map((m) => m.name).join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRx(rx)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white text-teal-700 font-bold text-xs rounded-lg border border-teal-200 hover:bg-teal-50"
                >
                  <Printer className="w-3.5 h-3.5" /> View / Print
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Invoices & Billing History</h3>
        <div className="divide-y divide-slate-100">
          {myBills.map((bill) => (
            <div key={bill.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{bill.id} - ${bill.total.toFixed(2)}</p>
                <p className="text-slate-500">Date: {bill.date} | Physician: {bill.doctorName}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={bill.paymentStatus === 'Paid' ? 'success' : 'danger'}>{bill.paymentStatus}</Badge>
                <button
                  onClick={() => setSelectedBill(bill)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice & Prescription Modals */}
      <PrintableInvoice isOpen={!!selectedBill} onClose={() => setSelectedBill(null)} bill={selectedBill} />
      <PrintablePrescription isOpen={!!selectedRx} onClose={() => setSelectedRx(null)} rx={selectedRx} />
      <BookAppointmentModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </div>
  );
};
