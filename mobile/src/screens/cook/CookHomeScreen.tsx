import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CookHomeScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>👩‍🍳 Cook Home</Text>
    <Text>Welcome, here’s where you’ll see today’s orders.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },
});

export default CookHomeScreen;
