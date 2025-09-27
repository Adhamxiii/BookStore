"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
  id?: string;
  email?: string;
  role?: string;
  name?: string;
  [key: string]: any;
} | null;

type AuthResult = { success: boolean; data: any; error?: string | null };

type AuthContextType = {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
  token: string | null;
  setToken: (t: string | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  error: string | null;
  setError: (v: string | null) => void;
  logout: () => Promise<AuthResult>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<AuthResult>;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<AuthResult>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refreshAuth: () => Promise<AuthResult>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const normalizeRole = (role: string) => {
    return role.toString().toLowerCase().trim();
  };

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/users/verify`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return { success: false, data: null };
      }
      const data = await res.json();
      const role = normalizeRole(data?.data?.role);
      setUser(data?.data || null);
      setToken(data?.token || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setUser(null);
      setToken(null);
      return { success: false, data: null, error: err?.message || null };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      let data: any = null;
      try {
        data = await res.json();
      } catch (_) {}
      if (!res.ok) {
      setUser(null);
      setToken(null);
      setError(null);
        return {
          success: false,
          data,
          error: data?.message || "Failed to logout",
        };
      }
      setUser(data?.data || null);
      setToken(data?.token || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setUser(null);
      setError(err?.message || "Failed to logout");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to logout",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { email, password, name } = userData;
    if (!email || !password || !name) {
      return { success: false, data: null, error: "Please fill in all fields" };
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          data,
          error: data?.message || "Failed to register",
        };
      }
      setUser(data?.data || null);
      setToken(data?.token || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to register");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to register",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    if (!email || !password) {
      return { success: false, data: null, error: "Please fill in all fields" };
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          data,
          error: data?.message || "Failed to login",
        };
      }
      setUser(data?.data || null);
      setToken(data?.token || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to login");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to login",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
        error,
        setError,
        logout,
        register,
        login,
        isAuthenticated: !!user,
        isAdmin: (user as any)?.role === "admin",
        refreshAuth: checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
