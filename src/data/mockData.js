export const initialPatients = [
  {
    id: "PAT-1001",
    fullName: "Eleanor Vance",
    gender: "Female",
    dob: "1990-05-14",
    phone: "+1 (555) 234-5678",
    email: "eleanor.vance@example.com",
    address: "742 Evergreen Terrace, Springfield",
    bloodGroup: "O+",
    emergencyContact: "Thomas Vance (+1 555-987-6543)",
    status: "Active",
    registeredDate: "2024-01-15"
  },
  {
    id: "PAT-1002",
    fullName: "Marcus Sterling",
    gender: "Male",
    dob: "1982-11-22",
    phone: "+1 (555) 876-5432",
    email: "m.sterling@example.com",
    address: "123 Maple Street, Metro City",
    bloodGroup: "A-",
    emergencyContact: "Sarah Sterling (+1 555-333-4444)",
    status: "Active",
    registeredDate: "2024-02-10"
  },
  {
    id: "PAT-1003",
    fullName: "Sophia Rodriguez",
    gender: "Female",
    dob: "1995-03-08",
    phone: "+1 (555) 345-6789",
    email: "sophia.r@example.com",
    address: "456 Oak Avenue, Riverdale",
    bloodGroup: "B+",
    emergencyContact: "Carlos Rodriguez (+1 555-222-1111)",
    status: "Active",
    registeredDate: "2024-03-01"
  },
  {
    id: "PAT-1004",
    fullName: "David Chen",
    gender: "Male",
    dob: "1975-09-30",
    phone: "+1 (555) 456-7890",
    email: "david.chen@example.com",
    address: "890 Pine Road, Gotham",
    bloodGroup: "AB+",
    emergencyContact: "Mei Chen (+1 555-666-7777)",
    status: "Active",
    registeredDate: "2024-04-18"
  },
  {
    id: "PAT-1005",
    fullName: "Amara Johnson",
    gender: "Female",
    dob: "2001-07-12",
    phone: "+1 (555) 567-8901",
    email: "amara.j@example.com",
    address: "321 Elm Street, Central City",
    bloodGroup: "O-",
    emergencyContact: "Kevin Johnson (+1 555-888-9999)",
    status: "Active",
    registeredDate: "2024-05-20"
  }
];

export const initialDoctors = [
  {
    id: "DOC-2001",
    fullName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    experience: "12 Years",
    phone: "+1 (555) 111-2222",
    email: "s.jenkins@carepulse.org",
    availability: "Mon, Wed, Fri (09:00 AM - 04:00 PM)",
    status: "Available"
  },
  {
    id: "DOC-2002",
    fullName: "Dr. Robert Thorne",
    department: "Neurology",
    specialization: "Neuro-oncology & Stroke",
    experience: "15 Years",
    phone: "+1 (555) 222-3333",
    email: "r.thorne@carepulse.org",
    availability: "Tue, Thu, Sat (10:00 AM - 05:00 PM)",
    status: "Available"
  },
  {
    id: "DOC-2003",
    fullName: "Dr. Emily Watson",
    department: "Pediatrics",
    specialization: "Pediatric Critical Care",
    experience: "8 Years",
    phone: "+1 (555) 333-4444",
    email: "e.watson@carepulse.org",
    availability: "Mon to Fri (08:30 AM - 02:30 PM)",
    status: "On Leave"
  },
  {
    id: "DOC-2004",
    fullName: "Dr. James Miller",
    department: "Orthopedics",
    specialization: "Joint Replacement & Trauma",
    experience: "18 Years",
    phone: "+1 (555) 444-5555",
    email: "j.miller@carepulse.org",
    availability: "Mon, Tue, Thu (09:00 AM - 03:00 PM)",
    status: "Available"
  },
  {
    id: "DOC-2005",
    fullName: "Dr. Alisha Patel",
    department: "Dermatology",
    specialization: "Cosmetic & Surgical Dermatology",
    experience: "10 Years",
    phone: "+1 (555) 555-6666",
    email: "a.patel@carepulse.org",
    availability: "Wed, Thu, Fri (11:00 AM - 06:00 PM)",
    status: "Available"
  },
  {
    id: "DOC-2006",
    fullName: "Dr. Michael Chang",
    department: "General Medicine",
    specialization: "Internal Medicine & Wellness",
    experience: "14 Years",
    phone: "+1 (555) 666-7777",
    email: "m.chang@carepulse.org",
    availability: "Mon to Sat (09:00 AM - 05:00 PM)",
    status: "Available"
  }
];

export const initialDepartments = [
  {
    id: "DEP-101",
    name: "Cardiology",
    headOfDepartment: "Dr. Sarah Jenkins",
    roomNumber: "Block A - 3rd Floor",
    totalDoctors: 8,
    totalPatients: 142,
    description: "Comprehensive cardiovascular care, ECG, Echo, and Angioplasty procedures."
  },
  {
    id: "DEP-102",
    name: "Neurology",
    headOfDepartment: "Dr. Robert Thorne",
    roomNumber: "Block B - 4th Floor",
    totalDoctors: 6,
    totalPatients: 98,
    description: "Advanced neurological diagnostics, brain surgery, and nerve disorder treatment."
  },
  {
    id: "DEP-103",
    name: "Orthopedics",
    headOfDepartment: "Dr. James Miller",
    roomNumber: "Block A - 1st Floor",
    totalDoctors: 7,
    totalPatients: 115,
    description: "Bone health, joint replacement, fracture management, and sports medicine."
  },
  {
    id: "DEP-104",
    name: "Pediatrics",
    headOfDepartment: "Dr. Emily Watson",
    roomNumber: "Block C - 2nd Floor",
    totalDoctors: 9,
    totalPatients: 210,
    description: "Specialized healthcare for infants, children, and adolescents."
  },
  {
    id: "DEP-105",
    name: "Dermatology",
    headOfDepartment: "Dr. Alisha Patel",
    roomNumber: "Block B - 2nd Floor",
    totalDoctors: 4,
    totalPatients: 85,
    description: "Skin conditions, allergy testing, laser therapies, and cosmetic dermatology."
  },
  {
    id: "DEP-106",
    name: "General Medicine",
    headOfDepartment: "Dr. Michael Chang",
    roomNumber: "Block Main - Ground Floor",
    totalDoctors: 12,
    totalPatients: 340,
    description: "Primary healthcare, routine physicals, chronic condition monitoring."
  }
];

export const initialAppointments = [
  {
    id: "APT-3001",
    patientId: "PAT-1001",
    patientName: "Eleanor Vance",
    doctorId: "DOC-2001",
    doctorName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    date: "2026-08-31",
    time: "10:30 AM",
    status: "Confirmed",
    reason: "Quarterly Cardiology Checkup & ECG Review"
  },
  {
    id: "APT-3002",
    patientId: "PAT-1002",
    patientName: "Marcus Sterling",
    doctorId: "DOC-2002",
    doctorName: "Dr. Robert Thorne",
    department: "Neurology",
    date: "2026-08-31",
    time: "11:45 AM",
    status: "Scheduled",
    reason: "Migraine Consultation & MRI Evaluation"
  },
  {
    id: "APT-3003",
    patientId: "PAT-1003",
    patientName: "Sophia Rodriguez",
    doctorId: "DOC-2005",
    doctorName: "Dr. Alisha Patel",
    department: "Dermatology",
    date: "2026-09-01",
    time: "02:15 PM",
    status: "Pending",
    reason: "Skin Allergy Consultation"
  },
  {
    id: "APT-3004",
    patientId: "PAT-1004",
    patientName: "David Chen",
    doctorId: "DOC-2004",
    doctorName: "Dr. James Miller",
    department: "Orthopedics",
    date: "2026-08-29",
    time: "09:00 AM",
    status: "Completed",
    reason: "Post-surgery knee rehabilitation check"
  },
  {
    id: "APT-3005",
    patientId: "PAT-1005",
    patientName: "Amara Johnson",
    doctorId: "DOC-2006",
    doctorName: "Dr. Michael Chang",
    department: "General Medicine",
    date: "2026-09-02",
    time: "04:00 PM",
    status: "Scheduled",
    reason: "Annual Wellness Screening"
  }
];

export const initialMedicalHistory = [
  {
    patientId: "PAT-1001",
    visits: [
      {
        id: "VIS-901",
        date: "2026-08-15",
        doctorName: "Dr. Sarah Jenkins",
        department: "Cardiology",
        symptoms: "Mild chest tightness, shortness of breath after exertion.",
        diagnosis: "Mild Hypertension & Sinus Tachycardia",
        treatment: "Prescribed Beta-Blocker therapy, low-sodium dietary plan.",
        doctorNotes: "ECG shows sinus rhythm with no ST changes. Recommended 24-hr Holter monitoring if symptoms recur.",
        prescriptions: ["Metoprolol 50mg - 1 tablet daily", "Aspirin 81mg - 1 tablet daily"],
        reports: ["ECG_Report_Aug15.pdf", "Lipid_Profile_Aug15.pdf"]
      },
      {
        id: "VIS-902",
        date: "2026-05-10",
        doctorName: "Dr. Michael Chang",
        department: "General Medicine",
        symptoms: "Seasonal flu, mild fever, body ache.",
        diagnosis: "Upper Respiratory Tract Infection",
        treatment: "Hydration, rest, paracetamol course.",
        doctorNotes: "Symptoms resolved within 5 days.",
        prescriptions: ["Paracetamol 650mg - 1 tablet tid for 3 days"],
        reports: ["Blood_Count_May10.pdf"]
      }
    ]
  },
  {
    patientId: "PAT-1002",
    visits: [
      {
        id: "VIS-903",
        date: "2026-07-20",
        doctorName: "Dr. Robert Thorne",
        department: "Neurology",
        symptoms: "Throbbing temporal headaches, photophobia.",
        diagnosis: "Episodic Migraine without aura",
        treatment: "Acute triptan therapy + prophylactic magnesium supplement.",
        doctorNotes: "MRI scan normal. Advised sleep cycle adjustment.",
        prescriptions: ["Sumatriptan 50mg - As needed", "Magnesium Oxide 400mg - Daily"],
        reports: ["Brain_MRI_Jul20.pdf"]
      }
    ]
  }
];

export const initialPrescriptions = [
  {
    id: "RX-5001",
    appointmentId: "APT-3001",
    patientId: "PAT-1001",
    patientName: "Eleanor Vance",
    doctorId: "DOC-2001",
    doctorName: "Dr. Sarah Jenkins",
    date: "2026-08-15",
    medicines: [
      { name: "Metoprolol Succinate 50mg", dosage: "50mg", frequency: "1-0-0 (Morning)", duration: "30 Days", instructions: "Take after breakfast with water" },
      { name: "Aspirin Dispersible 81mg", dosage: "81mg", frequency: "0-0-1 (Night)", duration: "30 Days", instructions: "Take after dinner" }
    ]
  },
  {
    id: "RX-5002",
    appointmentId: "APT-3002",
    patientId: "PAT-1002",
    patientName: "Marcus Sterling",
    doctorId: "DOC-2002",
    doctorName: "Dr. Robert Thorne",
    date: "2026-07-20",
    medicines: [
      { name: "Sumatriptan 50mg", dosage: "50mg", frequency: "As Needed", duration: "10 Days", instructions: "Take at onset of migraine headache" },
      { name: "Magnesium Oxide 400mg", dosage: "400mg", frequency: "0-0-1 (Night)", duration: "60 Days", instructions: "Take with food" }
    ]
  }
];

export const initialPharmacy = [
  {
    id: "MED-401",
    name: "Paracetamol 650mg",
    category: "Analgesic / Antipyretic",
    stock: 450,
    unitPrice: 2.50,
    expiryDate: "2027-11-30",
    manufacturer: "PharmaCare Global",
    lowStockThreshold: 100,
    status: "In Stock"
  },
  {
    id: "MED-402",
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    stock: 35,
    unitPrice: 12.00,
    expiryDate: "2026-12-15",
    manufacturer: "BioHealth Labs",
    lowStockThreshold: 50,
    status: "Low Stock"
  },
  {
    id: "MED-403",
    name: "Metoprolol 50mg",
    category: "Cardiovascular",
    stock: 120,
    unitPrice: 8.75,
    expiryDate: "2027-06-20",
    manufacturer: "Apex Therapeutics",
    lowStockThreshold: 40,
    status: "In Stock"
  },
  {
    id: "MED-404",
    name: "Metformin 500mg",
    category: "Anti-Diabetic",
    stock: 18,
    unitPrice: 5.50,
    expiryDate: "2026-10-10",
    manufacturer: "LifeScience Corp",
    lowStockThreshold: 40,
    status: "Low Stock"
  },
  {
    id: "MED-405",
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    stock: 280,
    unitPrice: 6.20,
    expiryDate: "2028-02-28",
    manufacturer: "PharmaCare Global",
    lowStockThreshold: 60,
    status: "In Stock"
  },
  {
    id: "MED-406",
    name: "Atorvastatin 10mg",
    category: "Lipid Lowering",
    stock: 15,
    unitPrice: 14.50,
    expiryDate: "2026-09-15",
    manufacturer: "Apex Therapeutics",
    lowStockThreshold: 30,
    status: "Low Stock"
  }
];

export const initialBills = [
  {
    id: "INV-8001",
    patientId: "PAT-1001",
    patientName: "Eleanor Vance",
    doctorName: "Dr. Sarah Jenkins",
    date: "2026-08-15",
    items: [
      { description: "Cardiology Specialist Consultation", category: "Consultation", amount: 150.00 },
      { description: "12-Lead Electrocardiogram (ECG)", category: "Lab/Test", amount: 95.00 },
      { description: "Metoprolol 50mg & Aspirin 81mg (30 Days)", category: "Medicine", amount: 45.00 }
    ],
    subtotal: 290.00,
    tax: 14.50,
    discount: 10.00,
    total: 294.50,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card"
  },
  {
    id: "INV-8002",
    patientId: "PAT-1002",
    patientName: "Marcus Sterling",
    doctorName: "Dr. Robert Thorne",
    date: "2026-07-20",
    items: [
      { description: "Neurology Consultation", category: "Consultation", amount: 180.00 },
      { description: "Brain MRI Scan with Contrast", category: "Lab/Test", amount: 450.00 }
    ],
    subtotal: 630.00,
    tax: 31.50,
    discount: 0.00,
    total: 661.50,
    paymentStatus: "Pending",
    paymentMethod: "Pending"
  },
  {
    id: "INV-8003",
    patientId: "PAT-1004",
    patientName: "David Chen",
    doctorName: "Dr. James Miller",
    date: "2026-08-29",
    items: [
      { description: "Orthopedic Follow-up & Rehab Guidance", category: "Consultation", amount: 120.00 },
      { description: "Knee X-Ray Bilateral", category: "Lab/Test", amount: 110.00 }
    ],
    subtotal: 230.00,
    tax: 11.50,
    discount: 15.00,
    total: 226.50,
    paymentStatus: "Paid",
    paymentMethod: "UPI"
  }
];

export const initialPayments = [
  {
    id: "PAY-7001",
    paymentId: "PAY-7001",
    patientName: "Eleanor Vance",
    billId: "INV-8001",
    amount: 294.50,
    paymentMethod: "Card",
    paymentStatus: "Completed",
    paymentDate: "2026-08-15 11:30 AM"
  },
  {
    id: "PAY-7002",
    paymentId: "PAY-7002",
    patientName: "David Chen",
    billId: "INV-8003",
    amount: 226.50,
    paymentMethod: "UPI",
    paymentStatus: "Completed",
    paymentDate: "2026-08-29 10:15 AM"
  },
  {
    id: "PAY-7003",
    paymentId: "PAY-7003",
    patientName: "Sophia Rodriguez",
    billId: "INV-8000",
    amount: 75.00,
    paymentMethod: "Cash",
    paymentStatus: "Completed",
    paymentDate: "2026-08-10 03:45 PM"
  }
];

export const initialNotifications = [
  {
    id: "NOTIF-1",
    title: "Low Pharmacy Stock Warning",
    message: "Atorvastatin 10mg stock has dropped to 15 units (Threshold: 30).",
    timestamp: "10 minutes ago",
    type: "warning",
    read: false,
    targetRole: "Admin"
  },
  {
    id: "NOTIF-2",
    title: "New Appointment Booked",
    message: "Patient Marcus Sterling booked a Neurology slot with Dr. Robert Thorne for Aug 31.",
    timestamp: "1 hour ago",
    type: "info",
    read: false,
    targetRole: "Doctor"
  },
  {
    id: "NOTIF-3",
    title: "Payment Received",
    message: "Invoice INV-8003 ($226.50) paid via UPI by David Chen.",
    timestamp: "3 hours ago",
    type: "success",
    read: true,
    targetRole: "Admin"
  },
  {
    id: "NOTIF-4",
    title: "Prescription Updated",
    message: "Dr. Sarah Jenkins updated prescription RX-5001 for Eleanor Vance.",
    timestamp: "Yesterday",
    type: "info",
    read: true,
    targetRole: "Patient"
  }
];

export const analyticsData = {
  monthlyRegistrations: [
    { month: "Jan", patients: 65, appointments: 120 },
    { month: "Feb", patients: 80, appointments: 145 },
    { month: "Mar", patients: 95, appointments: 170 },
    { month: "Apr", patients: 110, appointments: 190 },
    { month: "May", patients: 130, appointments: 220 },
    { month: "Jun", patients: 145, appointments: 240 },
    { month: "Jul", patients: 160, appointments: 280 },
    { month: "Aug", patients: 185, appointments: 310 }
  ],
  revenueStats: [
    { month: "Jan", consultation: 12000, pharmacy: 8500, lab: 6400, total: 26900 },
    { month: "Feb", consultation: 14500, pharmacy: 9200, lab: 7100, total: 30800 },
    { month: "Mar", consultation: 16000, pharmacy: 11000, lab: 8500, total: 35500 },
    { month: "Apr", consultation: 17500, pharmacy: 12400, lab: 9200, total: 39100 },
    { month: "May", consultation: 19000, pharmacy: 13500, lab: 10500, total: 43000 },
    { month: "Jun", consultation: 21500, pharmacy: 15000, lab: 12000, total: 48500 },
    { month: "Jul", consultation: 24000, pharmacy: 16800, lab: 13500, total: 54300 },
    { month: "Aug", consultation: 27500, pharmacy: 18200, lab: 15400, total: 61100 }
  ],
  patientsByDepartment: [
    { name: "General Medicine", value: 340, fill: "#0284c7" },
    { name: "Pediatrics", value: 210, fill: "#14b8a6" },
    { name: "Cardiology", value: 142, fill: "#f59e0b" },
    { name: "Orthopedics", value: 115, fill: "#8b5cf6" },
    { name: "Neurology", value: 98, fill: "#ec4899" },
    { name: "Dermatology", value: 85, fill: "#06b6d4" }
  ],
  appointmentStatuses: [
    { name: "Confirmed", value: 45, fill: "#10b981" },
    { name: "Scheduled", value: 30, fill: "#3b82f6" },
    { name: "Pending", value: 15, fill: "#f59e0b" },
    { name: "Completed", value: 60, fill: "#6366f1" },
    { name: "Cancelled", value: 8, fill: "#ef4444" }
  ]
};
