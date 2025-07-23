import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Order, useOrdersStore } from "../../stores/useOrdersStore";
import { WaiterStackParamList } from "../../navigation/SignedInNavigation/WaiterRoutes";

type DetailsRoute = RouteProp<WaiterStackParamList, "TableDetails">;
type DetailsNav = NativeStackNavigationProp<
  WaiterStackParamList,
  "TableDetails"
>;

export default function TableDetailsScreen() {
  const { params } = useRoute<DetailsRoute>();
  const navigation = useNavigation<DetailsNav>();
  const { orders, loading, fetchOrders } = useOrdersStore();

  const order = orders.find((o) => o.id === params.orderId);

  useEffect(() => {
    if (!order) fetchOrders().catch(console.error);
  }, [order, fetchOrders]);

  if (loading || !order) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const badgeStyles: Record<Order["status"], ViewStyle> = {
    WAITING: styles.badge_waiting,
    CONFIRMED: styles.badge_confirmed,
    READY: styles.badge_ready,
  };

  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Table {order.tableNumber}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={[styles.badge, badgeStyles[order.status]]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.infoValue}>{formattedDate}</Text>
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {order.ingredients.map((i) => (
              <View key={i.id} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{i.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={order.status !== "WAITING"}
          onPress={() =>
            navigation.navigate("EditOrder", { orderId: order.id })
          }
        >
          <Text style={styles.buttonText}>Edit Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badge_waiting: {
    backgroundColor: "rgba(255,165,0,0.2)",
  },
  badge_confirmed: {
    backgroundColor: "rgba(40,167,69,0.2)",
  },
  badge_ready: {
    backgroundColor: "rgba(30,144,255,0.2)",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#333",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ingredientChip: {
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  ingredientText: {
    fontSize: 14,
    color: "#333",
  },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disableButton: {
    backgroundColor: "#ccc",
  },
});
