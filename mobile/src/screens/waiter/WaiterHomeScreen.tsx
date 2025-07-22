import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Order, useOrdersStore } from "../../stores/useOrdersStore";

type WaiterStackParamList = {
  WaiterHome: undefined;
  TableDetails: { orderId: number };
};

type NavigationProp = NativeStackNavigationProp<
  WaiterStackParamList,
  "WaiterHome"
>;

export default function WaiterHomeScreen() {
  const { orders, loading, error, fetchOrders } = useOrdersStore();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading && orders.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error && orders.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: Order }) => {
    const time = new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const statusStyle =
      styles[`status_${item.status.toLowerCase()}` as keyof typeof styles];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("TableDetails", { orderId: item.id })
        }
      >
        <View style={styles.header}>
          <Text style={styles.table}>Table {item.tableNumber}</Text>
          <Text style={[styles.status, statusStyle]}>{item.status}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
        <Text numberOfLines={1} style={styles.ingredients}>
          {(item.ingredients ?? []).length > 0
            ? item.ingredients.map((i) => i.name).join(", ")
            : "No ingredients"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        // pull-to-refresh props:
        refreshing={loading}
        onRefresh={fetchOrders}
        ListEmptyComponent={<Text>No orders</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  table: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  status_waiting: {
    color: "#FFA500",
  },
  status_ready: {
    color: "#1E90FF",
  },
  status_confirmed: {
    color: "#28A745",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  ingredients: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#c00",
    fontSize: 16,
  },
});
