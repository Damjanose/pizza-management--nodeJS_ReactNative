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
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { WaiterStackParamList } from "../../navigation/SignedInNavigation/WaiterRoutes";
import { OrdersService } from '../../services/orders';

type Props = NativeStackScreenProps<WaiterStackParamList, "NewOrder">;

export default function NewOrderScreen({ navigation }: Props) {
  const { ingredients, fetchIngredients, createOrder, loading } =
    useOrdersStore();
  const [tableNumber, setTableNumber] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(loading); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchIngredients().catch(console.error);
  }, [fetchIngredients]);

  const toggle = (id: number) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };

  const handleCreateOrder = async () => {
    setIsLoading(true);
    setModalVisible(false);
    setModalMessage('');
    try {
      const orderData = {
        tableNumber: Number(tableNumber),
        ingredientIds: selectedIds,
      };
      const response = await OrdersService.createNewOrder(orderData);
      if (response?.data?.error) {
        setModalMessage(response.data.error);
        setModalVisible(true);
        setIsLoading(false);
        return;
      }
      navigation.goBack();
    } catch (error: any) {
      setModalMessage(error.response.data.error || 'An error occurred.');
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
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
        placeholderTextColor={'#ccc'}
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
          onPress={handleCreateOrder}
          disabled={isLoading || !tableNumber.trim() || selectedIds.length === 0}
        />
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    minWidth: 220,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
