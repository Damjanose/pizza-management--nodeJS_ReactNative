import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useAuth from "../../providers/hooks/useAuth";

import WaiterHomeScreen from "../../screens/waiter/WaiterHomeScreen";
import TableDetailsScreen from "../../screens/waiter/TableDetailsScreen";
import NewOrderScreen from "../../screens/waiter/NewOrderScreen";
import EditOrderScreen from "../../screens/waiter/EditOrderScreen";

export type WaiterStackParamList = {
  WaiterHome: undefined;
  TableDetails: { orderId: number };
  NewOrder: undefined;
  EditOrder: { orderId: number };
};

const Stack = createNativeStackNavigator<WaiterStackParamList>();

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

export default function WaiterRoutes() {
  return (
    <Stack.Navigator initialRouteName="WaiterHome" screenOptions={baseOptions}>
      <Stack.Screen
        name="WaiterHome"
        component={WaiterHomeScreen}
        options={({ navigation }) => ({
          title: "Your Tables",
          headerLeft: () => <LogoutButton />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewOrder")}
              style={{ paddingHorizontal: 16 }}
            >
              <MaterialIcons name="add" size={24} />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="TableDetails"
        component={TableDetailsScreen}
        options={({ route }) => ({
          title: `Table ${route.params.orderId}`,
        })}
      />

      <Stack.Screen
        name="NewOrder"
        component={NewOrderScreen}
        options={{
          title: "New Order",
        }}
      />

      <Stack.Screen
        name="EditOrder"
        component={EditOrderScreen}
        options={{
          title: "Edit Order",
        }}
      />
    </Stack.Navigator>
  );
}
