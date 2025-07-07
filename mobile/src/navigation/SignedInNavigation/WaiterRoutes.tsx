import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaiterHomeScreen from "../../screens/waiter/WaiterHomeScreen";
import TableDetailsScreen from "../../screens/waiter/TableDetailsScreen";

const Stack = createNativeStackNavigator();

export default function WaiterRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="WaiterHome"
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Stack.Screen name="WaiterHome" component={WaiterHomeScreen} />
      <Stack.Screen name="TableDetails" component={TableDetailsScreen} />
    </Stack.Navigator>
  );
}
