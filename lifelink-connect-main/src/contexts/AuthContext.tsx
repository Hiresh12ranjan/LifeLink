// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// export type UserRole = 'guest' | 'donor' | 'receiver' | 'admin';

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   bloodGroup?: string;
//   location?: {
//     city: string;
//     area: string;
//   };
//   phone?: string;
//   isAvailable?: boolean;
//   lastDonation?: string;
//   createdAt: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (data: SignupData) => Promise<void>;
//   logout: () => void;
//   updateUser: (updates: Partial<User>) => void;
// }

// interface SignupData {
//   email: string;
//   password: string;
//   name: string;
//   role: 'donor' | 'receiver';
//   bloodGroup?: string;
//   phone?: string;
//   city?: string;
//   area?: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Mock users for simulation
// const mockUsers: Record<string, User & { password: string }> = {
//   'donor@example.com': {
//     id: '1',
//     email: 'donor@example.com',
//     password: 'password123',
//     name: 'John Donor',
//     role: 'donor',
//     bloodGroup: 'O+',
//     location: { city: 'Mumbai', area: 'Andheri' },
//     phone: '+91 98765 43210',
//     isAvailable: true,
//     lastDonation: '2024-09-15',
//     createdAt: '2024-01-01',
//   },
//   'receiver@example.com': {
//     id: '2',
//     email: 'receiver@example.com',
//     password: 'password123',
//     name: 'Sarah Receiver',
//     role: 'receiver',
//     bloodGroup: 'A+',
//     location: { city: 'Mumbai', area: 'Bandra' },
//     phone: '+91 98765 43211',
//     createdAt: '2024-02-01',
//   },
// };

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored session
//     const storedUser = localStorage.getItem('lifelink_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     const mockUser = mockUsers[email];
//     if (mockUser && mockUser.password === password) {
//       const { password: _, ...userData } = mockUser;
//       setUser(userData);
//       localStorage.setItem('lifelink_user', JSON.stringify(userData));
//       localStorage.setItem('lifelink_token', 'mock_jwt_token_' + userData.id);
//     } else {
//       throw new Error('Invalid email or password');
//     }
    
//     setIsLoading(false);
//   };

//   const signup = async (data: SignupData) => {
//     setIsLoading(true);
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (mockUsers[data.email]) {
//       setIsLoading(false);
//       throw new Error('Email already registered');
//     }
    
//     const newUser: User = {
//       id: Date.now().toString(),
//       email: data.email,
//       name: data.name,
//       role: data.role,
//       bloodGroup: data.bloodGroup,
//       location: data.city && data.area ? { city: data.city, area: data.area } : undefined,
//       phone: data.phone,
//       isAvailable: data.role === 'donor' ? true : undefined,
//       createdAt: new Date().toISOString(),
//     };
    
//     setUser(newUser);
//     localStorage.setItem('lifelink_user', JSON.stringify(newUser));
//     localStorage.setItem('lifelink_token', 'mock_jwt_token_' + newUser.id);
//     setIsLoading(false);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('lifelink_user');
//     localStorage.removeItem('lifelink_token');
//   };

//   const updateUser = (updates: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...updates };
//       setUser(updatedUser);
//       localStorage.setItem('lifelink_user', JSON.stringify(updatedUser));
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         signup,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "@/services/api";

/* =========================
   Types
========================= */

export type UserRole = "donor" | "receiver" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bloodGroup?: string;
  location?: {
    city: string;
    area: string;
  };
  phone?: string;
  isAvailable?: boolean;
  lastDonation?: string;
  createdAt: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: "donor" | "receiver";
  bloodGroup?: string;
  phone?: string;
  city?: string;
  area?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

/* =========================
   Context
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   Provider
========================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     Restore session on refresh
  ========================= */

  useEffect(() => {
    const token = localStorage.getItem("lifelink_token");
    const storedUser = localStorage.getItem("lifelink_user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  /* =========================
     Login
  ========================= */

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("lifelink_token", token);
      localStorage.setItem("lifelink_user", JSON.stringify(user));

      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     Signup
  ========================= */

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/register", data);

      const { token, user } = res.data;

      localStorage.setItem("lifelink_token", token);
      localStorage.setItem("lifelink_user", JSON.stringify(user));

      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     Logout
  ========================= */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lifelink_user");
    localStorage.removeItem("lifelink_token");
  };

  /* =========================
     Update User (local only)
  ========================= */

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("lifelink_user", JSON.stringify(updatedUser));
  };

  /* =========================
     Provider
  ========================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   Hook
========================= */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
