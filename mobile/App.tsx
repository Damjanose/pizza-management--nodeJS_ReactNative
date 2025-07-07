import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/providers/AuthProvider";
import { StatusBarProvider } from "./src/providers/StatusBarProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <StatusBarProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthProvider>
    </StatusBarProvider>
  );
}
