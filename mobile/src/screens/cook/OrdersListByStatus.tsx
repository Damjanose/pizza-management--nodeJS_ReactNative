import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Order, useOrdersStore } from "../../stores/useOrdersStore";

interface Props {
  status: Order["status"];
  actionLabel?: string;
  action?: (id: number) => Promise<void>;
}

export default function OrdersListByStatus({
  status,
  actionLabel,
  action,
}: Props) {
  const { orders, loading, fetchOrders } = useOrdersStore();
  const filtered = orders.filter((o) => o.status === status);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = useCallback(() => fetchOrders(), [fetchOrders]);

  const renderItem = ({ item }: { item: Order }) => {
    const time = new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.table}>Table {item.tableNumber}</Text>
          <View
            style={[
              styles.badge,
              // styles[
              //   `badge_${item.status.toLowerCase()}` as keyof typeof styles
              // ],
            ]}
          >
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.time}>{time}</Text>

        <View style={styles.ingredientsContainer}>
          {item.ingredients &&item.ingredients.map((i) => (
            <View key={i.id} style={styles.chip}>
              <Text style={styles.chipText}>{i.name}</Text>
            </View>
          ))}
        </View>

        {action && actionLabel && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => action(item.id)}
          >
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(o) => o.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  list: { padding: 16, paddingBottom: 32 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  table: { fontSize: 18, fontWeight: "600", color: "#333" },

  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  badge_waiting: { backgroundColor: "rgba(255,165,0,0.2)" },
  badge_confirmed: { backgroundColor: "rgba(40,167,69,0.2)" },
  badge_ready: { backgroundColor: "rgba(30,144,255,0.2)" },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#333",
  },

  time: { fontSize: 12, color: "#555", marginBottom: 8 },

  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    margin: 4,
  },
  chipText: { fontSize: 13, color: "#333" },

  actionButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
