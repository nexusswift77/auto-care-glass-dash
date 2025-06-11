
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'manager' | 'technician';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  verify2FA: (code: string) => Promise<boolean>;
  needs2FA: boolean;
  tempUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needs2FA, setNeeds2FA] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  // Mock users for demo - in production this would connect to Supabase
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@paulstar.com',
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    },
    {
      id: '2',
      email: 'manager@paulstar.com', 
      name: 'Manager User',
      role: 'manager',
      isActive: true,
    },
    {
      id: '3',
      email: 'tech@paulstar.com',
      name: 'Tech User', 
      role: 'technician',
      isActive: true,
    }
  ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('paulstar_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in production this would be handled by Supabase
    const foundUser = mockUsers.find(u => u.email === email && u.isActive);
    
    if (foundUser && password === 'password123') {
      // For admin and manager roles, require 2FA
      if (foundUser.role === 'admin' || foundUser.role === 'manager') {
        setTempUser(foundUser);
        setNeeds2FA(true);
        setIsLoading(false);
        return true;
      } else {
        // Technician can login directly
        const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('paulstar_user', JSON.stringify(updatedUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock 2FA verification - accept any 6-digit code
    if (code.length === 6 && tempUser) {
      const updatedUser = { ...tempUser, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('paulstar_user', JSON.stringify(updatedUser));
      setTempUser(null);
      setNeeds2FA(false);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setTempUser(null);
    setNeeds2FA(false);
    localStorage.removeItem('paulstar_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      verify2FA,
      needs2FA,
      tempUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
