import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./NewsScreen.styles";

const DATA = [
  { id: "1", name: "Lajmi 1" },
  { id: "2", name: "Lajmi 2" },
  { id: "3", name: "Lajmi 3" },
];

export default function NewsScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.idCell]}>{item.id}</Text>
      <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
      <View style={[styles.cell, styles.actionCell]}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.idCell, styles.headerText]}>ID</Text>
        <Text style={[styles.cell, styles.nameCell, styles.headerText]}>
          Emër
        </Text>
        <Text style={[styles.cell, styles.actionCell, styles.headerText]}>
          Action
        </Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}
