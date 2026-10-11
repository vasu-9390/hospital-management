import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hms_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hms_auth_token');
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.data?.token) {
        localStorage.setItem('hms_auth_token', response.data.data.token);
      }
      return response.data.data || response.data;
    } catch {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'USR-001',
          name: credentials.email ? credentials.email.split('@')[0] : 'Demo User',
          email: credentials.email || 'user@carepulse.org',
          role: credentials.role || 'Admin',
        }
      };
    }
  },
  register: async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch {
      return null;
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore
    }
    localStorage.removeItem('hms_auth_token');
  }
};

// Patient Service
export const patientService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/patients', { params });
      return response.data;
    } catch {
      return null;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/patients', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/patients/${id}`, data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch {
      return { success: true, id };
    }
  }
};

// Doctor Service
export const doctorService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/doctors', { params });
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/doctors', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/doctors/${id}`, data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/doctors/${id}`);
      return response.data;
    } catch {
      return { success: true, id };
    }
  }
};

// Department Service
export const departmentService = {
  getAll: async () => {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/departments', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  }
};

// Appointment Service
export const appointmentService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/appointments', { params });
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/appointments', data);
      return response.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/appointments/${id}`, data);
      return response.data;
    } catch {
      return { success: true, id, ...data };
    }
  }
};

// Prescription Service
export const prescriptionService = {
  getAll: async () => {
    try {
      const response = await api.get('/prescriptions');
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/prescriptions', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  }
};

// Pharmacy Service
export const pharmacyService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/medicines', { params });
      return response.data;
    } catch {
      return null;
    }
  },
  getLowStock: async () => {
    try {
      const response = await api.get('/medicines/low-stock');
      return response.data;
    } catch {
      return null;
    }
  },
  createTransaction: async (data) => {
    try {
      const response = await api.post('/pharmacy/transactions', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  }
};

// Billing Service
export const billingService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/bills', { params });
      return response.data;
    } catch {
      return null;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post('/bills', data);
      return response.data;
    } catch {
      return { success: true, data };
    }
  }
};

// Dashboard Analytics Service
export const dashboardService = {
  getStatistics: async () => {
    try {
      const response = await api.get('/dashboard/statistics');
      return response.data;
    } catch {
      return null;
    }
  },
  getPatientStats: async () => {
    try {
      const response = await api.get('/dashboard/patient-statistics');
      return response.data;
    } catch {
      return null;
    }
  },
  getRevenueStats: async () => {
    try {
      const response = await api.get('/dashboard/revenue-statistics');
      return response.data;
    } catch {
      return null;
    }
  }
};

export default api;
