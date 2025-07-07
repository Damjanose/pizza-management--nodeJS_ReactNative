import React, { createContext, useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthType {
  login: (name: string, pass: string) => Promise<void>;
  loading: boolean;
  isSignedIn: boolean;
  isSigningIn: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (name: string, pass: string) => {
    setLoading(true);
    try {
      const { data } = await AuthService.login({ name, pass });
      const { role } = data;

      if (role) {
        await AsyncStorage.setItem("role", role);
        setIsSignedIn(true);
      }

      console.log(data, "111");
    } catch (e: any) {
      setError("login error");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedInCheck = useCallback(async () => {
    setIsSigningIn(true);
    const role = await AsyncStorage.getItem("role");
    try {
      if (role) setIsSignedIn(true);
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
        loading,
        error,
        isSignedIn,
        isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
