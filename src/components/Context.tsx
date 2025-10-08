// src/context/AuthContext.js
"use client"; // لو بتستخدم Client Components
import { createContext, useContext, useState } from "react";

// إنشاء الـ Context
const AuthContext = createContext({});

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // المتغير الشامل (مثال: حالة المستخدم)
  const [usertype, setUsertype] = useState("normal");
  // دالة لتسجيل الدخول
  const login = (userData) => {
    setUser(userData);
  };

  // دالة للخروج
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, usertype, setUsertype }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook لاستخدام الـ Context بسهولة
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
