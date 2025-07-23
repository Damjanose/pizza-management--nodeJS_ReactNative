import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
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

const STATUS_COLORS: Record<string, string> = {
  WAITING: '#FFD700', // gold
  READY: '#4CAF50',   // green
  CONFIRMED: '#2196F3', // blue
};

const groupAndSortOrders = (orders: Order[]): Record<string, Order[]> => {
  const grouped: Record<string, Order[]> = {
    WAITING: [],
    READY: [],
    CONFIRMED: [],
  };
  orders.forEach((order: Order) => {
    if (grouped[order.status]) {
      grouped[order.status].push(order);
    }
  });
  Object.keys(grouped).forEach((status: string) => {
    grouped[status].sort((a: Order, b: Order) => a.tableNumber - b.tableNumber);
  });
  return grouped;
};

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

  const groupedOrders = groupAndSortOrders(orders);

  return (
    <ScrollView style={styles.container}>
      {(['WAITING', 'READY', 'CONFIRMED'] as const).map((status) => (
        <View key={status} style={styles.statusGroup}>
          <Text style={styles.cardHeader}>{status}</Text>
          {groupedOrders[status].length === 0 ? (
            <Text style={styles.emptyText}>No orders in this status.</Text>
          ) : (
            groupedOrders[status].map((order: Order) => (
              <TouchableOpacity
                key={order.id}
                style={[styles.orderCard, { borderLeftColor: STATUS_COLORS[order.status] || '#ccc' }]}
                onPress={() => navigation.navigate('TableDetails', { orderId: order.id })}
                activeOpacity={0.8}
              >
                <View style={styles.orderHeaderRow}>
                  <Text style={styles.orderTable}>Table {order.tableNumber}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] || '#ccc' }]}> 
                    <Text style={styles.statusBadgeText}>{order.status}</Text>
                  </View>
                </View>
                <View style={styles.chipRow}>
                  {order.ingredients && order.ingredients.length > 0 ? (
                    order.ingredients.map((i: { name: string }, idx: number) => (
                      <View key={idx} style={styles.chip}>
                        <Text style={styles.chipText}>{i.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noIngredients}>No ingredients</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  statusGroup: {
    marginBottom: 24,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  orderTable: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  chip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 13,
    color: '#333',
  },
  noIngredients: {
    color: '#aaa',
    fontStyle: 'italic',
    fontSize: 13,
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
