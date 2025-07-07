import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CookHomeScreen from "../../screens/cook/CookHomeScreen";
import OrderTicketsScreen from "../../screens/cook/OrderTicketsScreen";

const Stack = createNativeStackNavigator();

export default function CookRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="CookHome"
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Stack.Screen name="CookHome" component={CookHomeScreen} />
      <Stack.Screen name="OrderTickets" component={OrderTicketsScreen} />
    </Stack.Navigator>
  );
}
