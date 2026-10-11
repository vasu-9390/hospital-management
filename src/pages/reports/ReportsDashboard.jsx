import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { MonthlyRegistrationsChart } from '../../components/charts/MonthlyRegistrationsChart';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { DepartmentChart } from '../../components/charts/DepartmentChart';
import { Printer, Calendar, BarChart3, Download, FileSpreadsheet } from 'lucide-react';

export const ReportsDashboard = () => {
  const { analyticsData, patients, doctors, bills, pharmacy } = useHMSData();
  const [timeFilter, setTimeFilter] = useState('Monthly');

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Hospital Analytics & Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive reporting for revenue, doctor performance, patient turnout, and inventory
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Filter Pills */}
          <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-bold text-slate-600">
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFilter(tf)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeFilter === tf
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow transition-all"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      {/* Printable Report Container */}
      <div className="printable-area space-y-6">
        {/* Report Summary Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Executive Hospital Operations Report</h2>
            <p className="text-xs text-slate-500">Period: <strong className="text-slate-800">{timeFilter} Summary</strong> | Generated on: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              CarePulse Health Intelligence
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyRegistrationsChart data={analyticsData.monthlyRegistrations} />
          <RevenueChart data={analyticsData.revenueStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DepartmentChart data={analyticsData.patientsByDepartment} />
          </div>

          {/* Quick Metrics Digest */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Operational Digest</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Total Registered Patients:</span>
                <span className="font-bold text-slate-900">{patients.length}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">On-Duty Doctors:</span>
                <span className="font-bold text-slate-900">{doctors.length}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Cumulative Gross Revenue:</span>
                <span className="font-bold text-emerald-700">$61,100.00</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Low Pharmacy Stock Items:</span>
                <span className="font-bold text-rose-600">
                  {pharmacy.filter(m => m.stock <= m.lowStockThreshold).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
