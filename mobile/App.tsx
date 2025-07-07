import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/providers/AuthProvider";
import { StatusBarProvider } from "./src/providers/StatusBarProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SocketProvider } from "./src/providers/SocketProvider";

export default function App() {
  return (
    <StatusBarProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <SocketProvider>
            <RootNavigator />
          </SocketProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </StatusBarProvider>
  );
}
