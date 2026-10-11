import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hms_user');
    return saved ? JSON.parse(saved) : {
      id: 'USR-ADMIN',
      name: 'Dr. Alexander Vance (Admin)',
      email: 'admin@carepulse.org',
      role: 'Admin', // Default role for demo
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hms_is_auth') === 'true' || true; // default logged in for smooth exploration
  });

  useEffect(() => {
    localStorage.setItem('hms_user', JSON.stringify(user));
    localStorage.setItem('hms_is_auth', isAuthenticated);
  }, [user, isAuthenticated]);

  const login = async (email, password, role = 'Admin') => {
    const result = await authService.login({ email, password, role });
    const userRole = role || 'Admin';
    let roleName = 'Alexander Vance (Admin)';
    let avatar = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80';

    if (userRole === 'Doctor') {
      roleName = 'Dr. Sarah Jenkins';
      avatar = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80';
    } else if (userRole === 'Patient') {
      roleName = 'Eleanor Vance';
      avatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80';
    } else if (userRole === 'Receptionist') {
      roleName = 'Clara Oswald (Reception desk)';
      avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';
    }

    const userData = {
      id: result.user?.id || `USR-${userRole.toUpperCase()}`,
      name: roleName,
      email: email || `${userRole.toLowerCase()}@carepulse.org`,
      role: userRole,
      avatar
    };

    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    login(`${newRole.toLowerCase()}@carepulse.org`, 'password', newRole);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
