// src/screens/waiter/NewOrderScreen.tsx

import React, { useEffect, useState } from "react";
import {
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
import { WaiterStackParamList } from "../../navigation/WaiterRoutes";
import { useOrdersStore } from "../../stores/useOrdersStore";

type Props = NativeStackScreenProps<WaiterStackParamList, "NewOrder">;

export default function NewOrderScreen({ navigation }: Props) {
  const { ingredients, fetchIngredients, createOrder, loading } =
    useOrdersStore();
  const [tableNumber, setTableNumber] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const toggle = (id: number) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };

  const submit = async () => {
    await createOrder(Number(tableNumber), selectedIds);
    navigation.goBack();
  };

  const renderIngredient = ({
    item,
  }: {
    item: { id: number; name: string };
  }) => {
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
            selected ? styles.chipTextSelected : styles.chipTextUnselected,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Table Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={tableNumber}
        onChangeText={setTableNumber}
        placeholder="e.g. 3"
      />

      <Text style={[styles.label, { marginTop: 24 }]}>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderIngredient}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.chipContainer}
      />

      <View style={styles.button}>
        <Button
          title="Create Order"
          onPress={submit}
          disabled={loading || !tableNumber.trim() || selectedIds.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
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
  chipSelected: {
    backgroundColor: "#007bff",
  },
  chipUnselected: {
    backgroundColor: "#f2f2f2",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  chipTextUnselected: {
    color: "#333",
  },
  button: { marginTop: "auto", marginBottom: 16 },
});
