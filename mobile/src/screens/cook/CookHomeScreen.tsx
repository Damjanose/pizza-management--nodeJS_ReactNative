import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersListByStatus from "./OrdersListByStatus";
import { useOrdersStore } from "../../stores/useOrdersStore";

type TabParamList = {
  Waiting: undefined;
  Cooking: undefined;
  Ready: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

export default function CookHomeScreen() {
  const { confirmOrder, readyOrder } = useOrdersStore();

  return (
    <Tab.Navigator
      initialRouteName="Waiting"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#007BFF" },
        tabBarLabelStyle: { fontWeight: "600" },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Waiting" options={{ tabBarLabel: "Waiting" }}>
        {() => (
          <OrdersListByStatus
            status="WAITING"
            actionLabel="Start Cooking"
            action={confirmOrder}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Cooking" options={{ tabBarLabel: "Cooking" }}>
        {() => (
          <OrdersListByStatus
            status="CONFIRMED"
            actionLabel="Mark Ready"
            action={readyOrder}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Ready" options={{ tabBarLabel: "Ready" }}>
        {() => <OrdersListByStatus status="READY" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
