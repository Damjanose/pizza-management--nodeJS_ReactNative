import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator.tsx";

const Stack = createNativeStackNavigator();

const SignedInRoutes = () => (
  <Stack.Navigator
    initialRouteName="Drawer"
    screenOptions={{ headerShown: false, animation: "fade" }}
  >
    <Stack.Screen name="Drawer" component={DrawerNavigator} />
  </Stack.Navigator>
);

export default SignedInRoutes;
