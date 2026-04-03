'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '@/types/auth';
import { authService } from '@/services/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setIsLoading(false));
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Игнорируем ошибки при logout
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
