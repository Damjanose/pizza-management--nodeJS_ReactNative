import React, { createContext, useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthType {
  login: (name: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isSignedIn: boolean;
  isSigningIn: boolean;
  error: string | null;
  role: string;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const login = async (name: string, pass: string) => {
    setLoading(true);
    try {
      const { data } = await AuthService.login({ name, pass });
      const { role } = data;

      if (role) {
        await AsyncStorage.setItem("role", role);
        setRole(role);
        setIsSignedIn(true);
      }
    } catch (e: any) {
      setError("login error");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsSignedIn(false);
    setRole("");
  };

  const isLoggedInCheck = useCallback(async () => {
    setIsSigningIn(true);
    const role = await AsyncStorage.getItem("role");
    try {
      if (role) {
        setRole(role);
        setIsSignedIn(true);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsSignedIn(false);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await isLoggedInCheck();
    };
    run().catch(console.error);
  }, [isLoggedInCheck]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        error,
        isSignedIn,
        isSigningIn,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
