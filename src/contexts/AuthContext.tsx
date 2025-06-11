
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
    console.log('AuthProvider: Checking for existing session');
    // Check for existing session
    const savedUser = localStorage.getItem('paulstar_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('AuthProvider: Found saved user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AuthProvider: Error parsing saved user:', error);
        localStorage.removeItem('paulstar_user');
      }
    }
    setIsLoading(false);
    console.log('AuthProvider: Initialization complete');
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider: Login attempt for:', email);
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in production this would be handled by Supabase
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
    console.log('AuthProvider: Found user:', foundUser);
    
    if (foundUser && password === 'password123') {
      console.log('AuthProvider: Password correct, checking role for 2FA');
      // For admin and manager roles, require 2FA
      if (foundUser.role === 'admin' || foundUser.role === 'manager') {
        console.log('AuthProvider: 2FA required for role:', foundUser.role);
        setTempUser(foundUser);
        setNeeds2FA(true);
        setIsLoading(false);
        return true;
      } else {
        console.log('AuthProvider: Direct login for technician');
        // Technician can login directly
        const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('paulstar_user', JSON.stringify(updatedUser));
        setIsLoading(false);
        return true;
      }
    }
    
    console.log('AuthProvider: Login failed - invalid credentials');
    setIsLoading(false);
    return false;
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    console.log('AuthProvider: 2FA verification attempt with code length:', code.length);
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock 2FA verification - accept any 6-digit code
    if (code.length === 6 && tempUser) {
      console.log('AuthProvider: 2FA successful, logging in user:', tempUser);
      const updatedUser = { ...tempUser, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('paulstar_user', JSON.stringify(updatedUser));
      setTempUser(null);
      setNeeds2FA(false);
      setIsLoading(false);
      return true;
    }
    
    console.log('AuthProvider: 2FA failed');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    console.log('AuthProvider: Logging out user');
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
