import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../providers/hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import SignedInRoutes from "./SignedInNavigation/SignedInRoutes";
import LoginScreen from "../screens/auth/LoginScreen";
import LoginSplash from "../screens/splash/Login.splash";

const RootStack = createNativeStackNavigator<{
  Login: undefined;
  SignedIn: undefined;
  LoginSplash: undefined;
}>();

export default () => {
  const { isSignedIn, isSigningIn } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isSigningIn ? (
          <RootStack.Screen name="LoginSplash" component={LoginSplash} />
        ) : isSignedIn ? (
          <RootStack.Screen name="SignedIn" component={SignedInRoutes} />
        ) : (
          <RootStack.Screen name="Login" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
