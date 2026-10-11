import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Department from '../models/Department.js';
import Appointment from '../models/Appointment.js';
import Medicine from '../models/Medicine.js';
import Bill from '../models/Bill.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';

dotenv.config();

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_management';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB database...');

    // Clear existing
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Department.deleteMany({});
    await Appointment.deleteMany({});
    await Medicine.deleteMany({});
    await Bill.deleteMany({});
    await Payment.deleteMany({});
    await Notification.deleteMany({});

    console.log('[Seed] Cleared old collection data.');

    // Users
    const users = await User.create([
      { name: 'Dr. Alexander Vance (Admin)', email: 'admin@carepulse.org', password: 'password123', role: 'Admin' },
      { name: 'Dr. Sarah Jenkins', email: 'doctor@carepulse.org', password: 'password123', role: 'Doctor' },
      { name: 'Eleanor Vance', email: 'patient@carepulse.org', password: 'password123', role: 'Patient' },
      { name: 'Clara Oswald (Reception)', email: 'staff@carepulse.org', password: 'password123', role: 'Staff' }
    ]);
    console.log(`[Seed] Created ${users.length} authenticated users.`);

    // Departments
    const depts = await Department.create([
      { departmentId: 'DEP-101', name: 'Cardiology', headOfDepartment: 'Dr. Sarah Jenkins', roomNumber: 'Block A - 3rd Floor', description: 'Comprehensive cardiovascular care.', totalDoctors: 8, totalPatients: 142 },
      { departmentId: 'DEP-102', name: 'Neurology', headOfDepartment: 'Dr. Robert Thorne', roomNumber: 'Block B - 4th Floor', description: 'Advanced neurological diagnostics.', totalDoctors: 6, totalPatients: 98 },
      { departmentId: 'DEP-103', name: 'Orthopedics', headOfDepartment: 'Dr. James Miller', roomNumber: 'Block A - 1st Floor', description: 'Bone health and joint surgery.', totalDoctors: 7, totalPatients: 115 },
      { departmentId: 'DEP-104', name: 'Pediatrics', headOfDepartment: 'Dr. Emily Watson', roomNumber: 'Block C - 2nd Floor', description: 'Specialized healthcare for infants & children.', totalDoctors: 9, totalPatients: 210 },
      { departmentId: 'DEP-105', name: 'Dermatology', headOfDepartment: 'Dr. Alisha Patel', roomNumber: 'Block B - 2nd Floor', description: 'Skin conditions and therapy.', totalDoctors: 4, totalPatients: 85 },
      { departmentId: 'DEP-106', name: 'General Medicine', headOfDepartment: 'Dr. Michael Chang', roomNumber: 'Block Main - Ground Floor', description: 'Primary healthcare and physicals.', totalDoctors: 12, totalPatients: 340 }
    ]);
    console.log(`[Seed] Created ${depts.length} departments.`);

    // Doctors
    const doctors = await Doctor.create([
      { doctorId: 'DOC-2001', userId: users[1]._id, name: 'Dr. Sarah Jenkins', specialization: 'Interventional Cardiology', department: 'Cardiology', experience: '12 Years', phone: '+1 (555) 111-2222', email: 's.jenkins@carepulse.org', availability: 'Mon, Wed, Fri (09:00 AM - 04:00 PM)', status: 'Available', consultationFee: 150 },
      { doctorId: 'DOC-2002', name: 'Dr. Robert Thorne', specialization: 'Neuro-oncology & Stroke', department: 'Neurology', experience: '15 Years', phone: '+1 (555) 222-3333', email: 'r.thorne@carepulse.org', availability: 'Tue, Thu, Sat (10:00 AM - 05:00 PM)', status: 'Available', consultationFee: 180 },
      { doctorId: 'DOC-2003', name: 'Dr. Emily Watson', specialization: 'Pediatric Critical Care', department: 'Pediatrics', experience: '8 Years', phone: '+1 (555) 333-4444', email: 'e.watson@carepulse.org', availability: 'Mon to Fri (08:30 AM - 02:30 PM)', status: 'Available', consultationFee: 140 },
      { doctorId: 'DOC-2004', name: 'Dr. James Miller', specialization: 'Joint Replacement & Trauma', department: 'Orthopedics', experience: '18 Years', phone: '+1 (555) 444-5555', email: 'j.miller@carepulse.org', availability: 'Mon, Tue, Thu (09:00 AM - 03:00 PM)', status: 'Available', consultationFee: 160 }
    ]);
    console.log(`[Seed] Created ${doctors.length} doctors.`);

    // Patients
    const patients = await Patient.create([
      { patientId: 'PAT-1001', userId: users[2]._id, name: 'Eleanor Vance', gender: 'Female', dateOfBirth: '1990-05-14', phone: '+1 (555) 234-5678', email: 'eleanor.vance@example.com', address: '742 Evergreen Terrace', bloodGroup: 'O+', emergencyContact: 'Thomas Vance (+1 555-987-6543)', status: 'Active' },
      { patientId: 'PAT-1002', name: 'Marcus Sterling', gender: 'Male', dateOfBirth: '1982-11-22', phone: '+1 (555) 876-5432', email: 'm.sterling@example.com', address: '123 Maple Street', bloodGroup: 'A-', emergencyContact: 'Sarah Sterling (+1 555-333-4444)', status: 'Active' },
      { patientId: 'PAT-1003', name: 'Sophia Rodriguez', gender: 'Female', dateOfBirth: '1995-03-08', phone: '+1 (555) 345-6789', email: 'sophia.r@example.com', address: '456 Oak Avenue', bloodGroup: 'B+', emergencyContact: 'Carlos Rodriguez (+1 555-222-1111)', status: 'Active' }
    ]);
    console.log(`[Seed] Created ${patients.length} patients.`);

    // Medicines
    const medicines = await Medicine.create([
      { medicineId: 'MED-401', medicineName: 'Paracetamol 650mg', category: 'Analgesic', manufacturer: 'PharmaCare Global', batchNumber: 'BATCH-9901', quantity: 450, price: 2.50, expiryDate: '2027-11-30', minimumStock: 50 },
      { medicineId: 'MED-402', medicineName: 'Amoxicillin 500mg', category: 'Antibiotic', manufacturer: 'BioHealth Labs', batchNumber: 'BATCH-8821', quantity: 35, price: 12.00, expiryDate: '2026-12-15', minimumStock: 50 },
      { medicineId: 'MED-403', medicineName: 'Metoprolol 50mg', category: 'Cardiovascular', manufacturer: 'Apex Therapeutics', batchNumber: 'BATCH-7741', quantity: 120, price: 8.75, expiryDate: '2027-06-20', minimumStock: 40 }
    ]);
    console.log(`[Seed] Created ${medicines.length} pharmacy items.`);

    // Appointments
    const appointments = await Appointment.create([
      { appointmentId: 'APT-3001', patient: patients[0]._id, doctor: doctors[0]._id, department: 'Cardiology', appointmentDate: '2026-08-31', appointmentTime: '10:30 AM', reason: 'Quarterly Cardiology Checkup & ECG', status: 'Confirmed' },
      { appointmentId: 'APT-3002', patient: patients[1]._id, doctor: doctors[1]._id, department: 'Neurology', appointmentDate: '2026-08-31', appointmentTime: '11:45 AM', reason: 'Migraine Consultation', status: 'Scheduled' }
    ]);
    console.log(`[Seed] Created ${appointments.length} appointments.`);

    // Bills & Payments
    const bill = await Bill.create({
      billNumber: 'INV-8001',
      patient: patients[0]._id,
      appointment: appointments[0]._id,
      doctorName: 'Dr. Sarah Jenkins',
      consultationFee: 150,
      medicineCharges: 45,
      testCharges: 95,
      otherCharges: 0,
      discount: 10,
      tax: 14.50,
      totalAmount: 294.50,
      paymentStatus: 'Paid',
      items: [
        { description: 'Cardiology Specialist Consultation', category: 'Consultation', amount: 150 },
        { description: '12-Lead Electrocardiogram (ECG)', category: 'Lab/Test', amount: 95 },
        { description: 'Metoprolol 50mg & Aspirin 81mg (30 Days)', category: 'Medicine', amount: 45 }
      ]
    });

    await Payment.create({
      paymentId: 'PAY-7001',
      bill: bill._id,
      patient: patients[0]._id,
      amount: 294.50,
      paymentMethod: 'Card',
      paymentStatus: 'Completed',
      transactionId: 'TXN-998231',
      paymentDate: '2026-08-15 11:30 AM'
    });
    console.log('[Seed] Created Bills and Payments.');

    // Notifications
    await Notification.create([
      { notificationId: 'NOTIF-1', title: 'Low Pharmacy Stock Warning', message: 'Amoxicillin 500mg stock has dropped to 35 units.', type: 'warning', targetRole: 'Admin' },
      { notificationId: 'NOTIF-2', title: 'New Appointment Booked', message: 'Patient Marcus Sterling booked a slot with Dr. Robert Thorne.', type: 'info', targetRole: 'Doctor' }
    ]);

    console.log('\n[Seed Success] Database seed completed cleanly!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seed();
