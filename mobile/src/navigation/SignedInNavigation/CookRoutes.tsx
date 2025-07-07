// src/navigation/SignedInNavigation/CookRoutes.tsx

import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useAuth from "../../providers/hooks/useAuth";

import CookHomeScreen from "../../screens/cook/CookHomeScreen";

export type CookStackParamList = {
  CookHome: undefined;
};

const Stack = createNativeStackNavigator<CookStackParamList>();

const baseOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#fff" },
  headerShadowVisible: false,
  animation: "fade",
};

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return (
    <TouchableOpacity onPress={logout} style={{ paddingHorizontal: 16 }}>
      <MaterialIcons name="logout" size={24} />
    </TouchableOpacity>
  );
};

export default function CookRoutes() {
  return (
    <Stack.Navigator initialRouteName="CookHome" screenOptions={baseOptions}>
      <Stack.Screen
        name="CookHome"
        component={CookHomeScreen}
        options={{
          title: "Cook Dashboard",
          headerLeft: () => <LogoutButton />,
        }}
      />
    </Stack.Navigator>
  );
}
