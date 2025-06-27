import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth";
import EncryptedStorage from "react-native-encrypted-storage";
import { ACCESS_TOKEN } from "../constants/auth.ts";
import { getAccessTokenFromEncryptedStorage } from "../store/auth/token.ts";

interface UserProfileProps {
  username: string;
  image: string;
}

interface AuthType {
  isSigningIn: boolean;
  isSignedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  userData: UserProfileProps | null;
  loading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<UserProfileProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await AuthService.login({ username, password });
      setError(null);

      const { accessToken, firstName, image } = response.data;
      if (accessToken) {
        await EncryptedStorage.setItem(ACCESS_TOKEN, accessToken);
        setUserData({ username: firstName, image });
        setIsSignedIn(true);
      }
    } catch (e: any) {
      setError("login error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await EncryptedStorage.removeItem(ACCESS_TOKEN);
      setIsSignedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loadSignInStatus = async () => {
      try {
        setIsSigningIn(true);
        const token = await getAccessTokenFromEncryptedStorage();
        if (token) setIsSignedIn(true);
        setIsSigningIn(false);
      } catch (e) {
        setIsSigningIn(false);
      }
    };

    loadSignInStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSigningIn,
        isSignedIn,
        login,
        logout,
        userData,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
