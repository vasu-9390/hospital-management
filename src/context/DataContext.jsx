import React, { createContext, useContext, useState } from 'react';
import {
  initialPatients,
  initialDoctors,
  initialDepartments,
  initialAppointments,
  initialMedicalHistory,
  initialPrescriptions,
  initialPharmacy,
  initialBills,
  initialPayments,
  initialNotifications,
  analyticsData
} from '../data/mockData';
import { useNotification } from './NotificationContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { notifySuccess, notifyInfo } = useNotification();

  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [departments, setDepartments] = useState(initialDepartments);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [pharmacy, setPharmacy] = useState(initialPharmacy);
  const [bills, setBills] = useState(initialBills);
  const [payments, setPayments] = useState(initialPayments);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Patient Actions
  const addPatient = (patient) => {
    const newId = `PAT-${1000 + patients.length + 1}`;
    const newPatient = {
      ...patient,
      id: newId,
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setPatients((prev) => [newPatient, ...prev]);
    notifySuccess(`Patient ${newPatient.fullName} added successfully.`);
    return newPatient;
  };

  const updatePatient = (id, updatedData) => {
    setPatients((prev) =>
      prev.map((pat) => (pat.id === id ? { ...pat, ...updatedData } : pat))
    );
    notifySuccess(`Patient record updated.`);
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((pat) => pat.id !== id));
    notifyInfo(`Patient record removed.`);
  };

  // Doctor Actions
  const addDoctor = (doc) => {
    const newId = `DOC-${2000 + doctors.length + 1}`;
    const newDoc = { ...doc, id: newId, status: 'Available' };
    setDoctors((prev) => [newDoc, ...prev]);
    notifySuccess(`Dr. ${newDoc.fullName} added to medical staff.`);
    return newDoc;
  };

  const updateDoctor = (id, updatedData) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updatedData } : doc))
    );
    notifySuccess(`Doctor profile updated.`);
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    notifyInfo(`Doctor record removed.`);
  };

  // Department Actions
  const addDepartment = (dept) => {
    const newId = `DEP-${100 + departments.length + 1}`;
    const newDept = {
      ...dept,
      id: newId,
      totalDoctors: dept.totalDoctors || 1,
      totalPatients: dept.totalPatients || 0
    };
    setDepartments((prev) => [...prev, newDept]);
    notifySuccess(`Department ${newDept.name} created.`);
  };

  const updateDepartment = (id, updatedData) => {
    setDepartments((prev) =>
      prev.map((dept) => (dept.id === id ? { ...dept, ...updatedData } : dept))
    );
    notifySuccess(`Department updated.`);
  };

  const deleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    notifyInfo(`Department deleted.`);
  };

  // Appointment Actions
  const bookAppointment = (aptData) => {
    const newId = `APT-${3000 + appointments.length + 1}`;
    const newApt = {
      ...aptData,
      id: newId,
      status: aptData.status || 'Scheduled'
    };
    setAppointments((prev) => [newApt, ...prev]);
    notifySuccess(`Appointment booked for ${newApt.patientName} on ${newApt.date}.`);
    return newApt;
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    notifyInfo(`Appointment status changed to ${status}.`);
  };

  // Prescription Actions
  const addPrescription = (rxData) => {
    const newId = `RX-${5000 + prescriptions.length + 1}`;
    const newRx = {
      ...rxData,
      id: newId,
      date: new Date().toISOString().split('T')[0]
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    notifySuccess(`Prescription ${newId} issued for ${newRx.patientName}.`);
    return newRx;
  };

  // Pharmacy Actions
  const addPharmacyItem = (item) => {
    const newId = `MED-${400 + pharmacy.length + 1}`;
    const newItem = {
      ...item,
      id: newId,
      stock: Number(item.stock),
      unitPrice: Number(item.unitPrice),
      lowStockThreshold: Number(item.lowStockThreshold || 30),
      status: Number(item.stock) <= Number(item.lowStockThreshold || 30) ? 'Low Stock' : 'In Stock'
    };
    setPharmacy((prev) => [newItem, ...prev]);
    notifySuccess(`Medicine ${newItem.name} added to pharmacy inventory.`);
  };

  const updatePharmacyItem = (id, updatedData) => {
    setPharmacy((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const merged = { ...med, ...updatedData };
          merged.status = Number(merged.stock) <= Number(merged.lowStockThreshold) ? 'Low Stock' : 'In Stock';
          return merged;
        }
        return med;
      })
    );
    notifySuccess(`Pharmacy item updated.`);
  };

  const deletePharmacyItem = (id) => {
    setPharmacy((prev) => prev.filter((med) => med.id !== id));
    notifyInfo(`Medicine item removed.`);
  };

  // Billing Actions
  const createBill = (billData) => {
    const newId = `INV-${8000 + bills.length + 1}`;
    const newBill = {
      ...billData,
      id: newId,
      date: new Date().toISOString().split('T')[0]
    };
    setBills((prev) => [newBill, ...prev]);

    // If marked as paid on creation, add payment log
    if (newBill.paymentStatus === 'Paid') {
      addPaymentLog({
        patientName: newBill.patientName,
        billId: newId,
        amount: newBill.total,
        paymentMethod: newBill.paymentMethod || 'Cash'
      });
    }

    notifySuccess(`Invoice ${newId} created successfully.`);
    return newBill;
  };

  const updateBillStatus = (billId, status, paymentMethod = 'Cash') => {
    setBills((prev) =>
      prev.map((b) => {
        if (b.id === billId) {
          return { ...b, paymentStatus: status, paymentMethod };
        }
        return b;
      })
    );

    if (status === 'Paid') {
      const targetBill = bills.find((b) => b.id === billId);
      if (targetBill) {
        addPaymentLog({
          patientName: targetBill.patientName,
          billId: targetBill.id,
          amount: targetBill.total,
          paymentMethod
        });
      }
    }
    notifySuccess(`Invoice ${billId} status updated to ${status}.`);
  };

  // Payment Actions
  const addPaymentLog = ({ patientName, billId, amount, paymentMethod }) => {
    const payId = `PAY-${7000 + payments.length + 1}`;
    const newPay = {
      id: payId,
      paymentId: payId,
      patientName,
      billId,
      amount,
      paymentMethod,
      paymentStatus: 'Completed',
      paymentDate: new Date().toLocaleString()
    };
    setPayments((prev) => [newPay, ...prev]);
  };

  // Notification Actions
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    notifyInfo('All notifications cleared.');
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        departments,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        medicalHistory,
        prescriptions,
        addPrescription,
        pharmacy,
        addPharmacyItem,
        updatePharmacyItem,
        deletePharmacyItem,
        bills,
        createBill,
        updateBillStatus,
        payments,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        analyticsData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useHMSData = () => useContext(DataContext);
