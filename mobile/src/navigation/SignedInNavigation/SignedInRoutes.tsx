import React from "react";
import { ActivityIndicator, View } from "react-native";
import useAuth from "../../providers/hooks/useAuth";
import WaiterRoutes from "./WaiterRoutes";
import CookRoutes from "./CookRoutes";

export default function SignedInRoutes() {
  const { role, isSigningIn } = useAuth();

  if (isSigningIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (role === "waiter") {
    return <WaiterRoutes />;
  }

  if (role === "cooker") {
    return <CookRoutes />;
  }

  return null;
}
