import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/providers/AuthProvider";
import { StatusBarProvider } from "./src/providers/StatusBarProvider";

export default function App() {
  return (
    <StatusBarProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </StatusBarProvider>
  );
}
