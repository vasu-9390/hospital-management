import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Receipt,
  BarChart3,
  Bell,
  HeartPulse,
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';

  const navItemsByRole = {
    Admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Patients', path: '/patients', icon: Users },
      { name: 'Doctors', path: '/doctors', icon: Stethoscope },
      { name: 'Departments', path: '/departments', icon: Building2 },
      { name: 'Appointments', path: '/appointments', icon: Calendar },
      { name: 'Prescriptions', path: '/prescriptions', icon: FileText },
      { name: 'Pharmacy Stock', path: '/pharmacy', icon: Pill },
      { name: 'Billing', path: '/billing', icon: Receipt },
      { name: 'Payments Log', path: '/payments', icon: CreditCard },
      { name: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
      { name: 'Notifications', path: '/notifications', icon: Bell },
    ],
    Doctor: [
      { name: 'Doctor Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
      { name: 'My Appointments', path: '/appointments', icon: Calendar },
      { name: 'Patient Directory', path: '/patients', icon: Users },
      { name: 'Prescriptions', path: '/prescriptions', icon: FileText },
      { name: 'Departments', path: '/departments', icon: Building2 },
      { name: 'Notifications', path: '/notifications', icon: Bell },
    ],
    Patient: [
      { name: 'Patient Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
      { name: 'Book / My Appointments', path: '/appointments', icon: Calendar },
      { name: 'My Prescriptions', path: '/prescriptions', icon: FileText },
      { name: 'My Invoices & Bills', path: '/billing', icon: Receipt },
      { name: 'Medical Reports', path: '/reports', icon: HeartPulse },
      { name: 'Notifications', path: '/notifications', icon: Bell },
    ],
    Receptionist: [
      { name: 'Reception Desk', path: '/receptionist/dashboard', icon: LayoutDashboard },
      { name: 'Book Appointment', path: '/appointments', icon: Calendar },
      { name: 'Patient Registration', path: '/patients', icon: Users },
      { name: 'Doctors Roster', path: '/doctors', icon: Stethoscope },
      { name: 'Billing Desk', path: '/billing', icon: Receipt },
      { name: 'Notifications', path: '/notifications', icon: Bell },
    ]
  };

  const navItems = navItemsByRole[role] || navItemsByRole.Admin;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-61px)] flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        {/* Role Header Badge */}
        <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Workspace</span>
            <span className="text-xs font-extrabold text-primary-400">{role} Workspace</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Nav Links List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-900/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">CarePulse HMS v2.4</p>
        <p className="text-[10px] text-slate-500">Connected to REST API & Local Context Engine</p>
      </div>
    </aside>
  );
};
