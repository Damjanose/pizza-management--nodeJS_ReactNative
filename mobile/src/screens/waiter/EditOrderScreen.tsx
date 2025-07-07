import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { WaiterStackParamList } from "../../navigation/SignedInNavigation/WaiterRoutes";
import useSocket from "../../providers/hooks/useSocket.ts";

type Props = NativeStackScreenProps<WaiterStackParamList, "EditOrder">;

export default function EditOrderScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const {
    orders,
    ingredients,
    fetchOrders,
    fetchIngredients,
    editOrder,
    loading,
    error,
  } = useOrdersStore();

  const { emitEvent } = useSocket();
  const [tableNumber, setTableNumber] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      if (orders.length === 0) await fetchOrders();
      if (ingredients.length === 0) await fetchIngredients();

      const order = useOrdersStore
        .getState()
        .orders.find((o) => o.id === orderId);
      if (order) {
        setTableNumber(order.tableNumber.toString());
        setSelectedIds(order.ingredients.map((i) => i.id));
      }
      setInitializing(false);
    })();
  }, [orderId, fetchOrders, fetchIngredients]);

  const toggle = (id: number) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );

  const handleSave = async () => {
    await editOrder(orderId, Number(tableNumber), selectedIds);
    emitEvent("newOrder", {
      table: Number(tableNumber),
      ingredients: selectedIds,
    });
    navigation.goBack();
  };

  if (initializing) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <Text style={styles.label}>Table Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={tableNumber}
        onChangeText={setTableNumber}
      />

      <Text style={[styles.label, { marginTop: 24 }]}>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(i) => i.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.chipContainer}
        renderItem={({ item }) => {
          const selected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.chip,
                selected ? styles.chipSelected : styles.chipUnselected,
              ]}
              onPress={() => toggle(item.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  selected
                    ? styles.chipTextSelected
                    : styles.chipTextUnselected,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.button}>
        <Button
          title="Save Changes"
          onPress={handleSave}
          disabled={loading || !tableNumber.trim() || selectedIds.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "#c00", marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "500", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  chipContainer: { paddingVertical: 12 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  chip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 4,
  },
  chipSelected: { backgroundColor: "#007bff" },
  chipUnselected: { backgroundColor: "#f2f2f2" },
  chipText: { fontSize: 14, fontWeight: "500" },
  chipTextSelected: { color: "#fff" },
  chipTextUnselected: { color: "#333" },
  button: { marginTop: "auto", marginBottom: 16 },
});
