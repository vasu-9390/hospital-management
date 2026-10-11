import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../layouts/DashboardLayout';

import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';

import { AdminDashboard } from '../pages/dashboard/AdminDashboard';
import { DoctorDashboard } from '../pages/dashboard/DoctorDashboard';
import { PatientDashboard } from '../pages/dashboard/PatientDashboard';
import { ReceptionistDashboard } from '../pages/dashboard/ReceptionistDashboard';

import { PatientList } from '../pages/patients/PatientList';
import { DoctorList } from '../pages/doctors/DoctorList';
import { DepartmentList } from '../pages/departments/DepartmentList';
import { AppointmentList } from '../pages/appointments/AppointmentList';
import { PrescriptionList } from '../pages/prescriptions/PrescriptionList';
import { PharmacyInventory } from '../pages/pharmacy/PharmacyInventory';
import { BillingList } from '../pages/billing/BillingList';
import { PaymentList } from '../pages/payments/PaymentList';
import { ReportsDashboard } from '../pages/reports/ReportsDashboard';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';

export const AppRoutes = () => {
  const { user } = useAuth();
  const defaultDashboard = user?.role ? `/${user.role.toLowerCase()}/dashboard` : '/admin/dashboard';

  return (
    <Routes>
      {/* Auth Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />

        <Route path="/patients" element={<PatientList />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/prescriptions" element={<PrescriptionList />} />
        <Route path="/pharmacy" element={<PharmacyInventory />} />
        <Route path="/billing" element={<BillingList />} />
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Default Catch-all */}
      <Route path="*" element={<Navigate to={defaultDashboard} replace />} />
    </Routes>
  );
};
