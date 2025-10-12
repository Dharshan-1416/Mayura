import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'lms_users';
const CURRENT_USER_KEY = 'lms_current_user';

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const register = async (email: string, password: string, fullName: string, role: UserRole) => {
    const users = getStoredUsers();

    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      fullName,
      role
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem(`lms_pwd_${email}`, password);

    setUser(newUser);
    setCurrentUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = localStorage.getItem(`lms_pwd_${email}`);
    if (storedPassword !== password) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    setCurrentUser(foundUser);
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
