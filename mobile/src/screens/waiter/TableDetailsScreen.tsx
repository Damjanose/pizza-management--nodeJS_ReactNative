// src/screens/waiter/TableDetailsScreen.tsx

import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Order, useOrdersStore } from "../../stores/useOrdersStore";

type WaiterStackParamList = {
  WaiterHome: undefined;
  TableDetails: { orderId: number };
};

type DetailsRoute = RouteProp<WaiterStackParamList, "TableDetails">;
type DetailsNav = NativeStackNavigationProp<
  WaiterStackParamList,
  "TableDetails"
>;

export default function TableDetailsScreen() {
  const { params } = useRoute<DetailsRoute>();
  const navigation = useNavigation<DetailsNav>();
  const { orders, loading, error, fetchOrders, confirmOrder, readyOrder } =
    useOrdersStore();

  const order = orders.find((o: Order) => o.id === params.orderId);
  useEffect(() => {
    if (!order) fetchOrders();
  }, [order, fetchOrders]);

  const handleConfirm = async () => {
    try {
      await confirmOrder(params.orderId);
      Alert.alert("Success", "Order confirmed");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const handleReady = async () => {
    try {
      await readyOrder(params.orderId);
      Alert.alert("Success", "Order marked ready");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  if (loading || !order) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Table {order.tableNumber} Details</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.value,
            styles[
              `status_${order.status.toLowerCase()}` as keyof typeof styles
            ],
          ]}
        >
          {order.status}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created:</Text>
        <Text style={styles.value}>
          {new Date(order.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Ingredients:</Text>
        <View style={styles.ingredientsList}>
          {order.ingredients.map((i) => (
            <Text key={i.id} style={styles.ingredient}>
              • {i.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        {order.status === "WAITING" && (
          <Button title="Confirm Order" onPress={handleConfirm} />
        )}
        {order.status === "CONFIRMED" && (
          <Button title="Mark Ready" onPress={handleReady} />
        )}
      </View>

      <View style={styles.buttons}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 16 },
  row: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "500" },
  value: { fontSize: 16 },
  status_waiting: { color: "#FFA500" },
  status_confirmed: { color: "#28A745" },
  status_ready: { color: "#1E90FF" },
  ingredientsList: { marginTop: 4, marginLeft: 8 },
  ingredient: { fontSize: 14, marginVertical: 2 },
  buttons: { marginVertical: 8 },
});
