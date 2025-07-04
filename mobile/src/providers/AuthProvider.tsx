import React, { createContext, useState } from "react";
import { AuthService } from "../services/auth";

interface AuthType {
  login: (name: string, pass: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (name: string, pass: string) => {
    setLoading(true);
    try {
      const data = await AuthService.login({ name, pass });

      console.log(data, "111");
    } catch (e: any) {
      setError("login error");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
