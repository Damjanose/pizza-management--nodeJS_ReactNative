// LoginScreen.tsx
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../../providers/hooks/useAuth";
import styles from "./LoginScreen.styles";

export default function LoginScreen() {
  const { login, error, loading } = useAuth();
  const [name, setName] = useState("waiter"); // or "cook/waiter"
  const [pass, setPass] = useState("waiter"); // or "cook/waiter"
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    await login(name, pass);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Login</Text>
            {error && <Text style={styles.textErr}>{error}</Text>}

            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder="Password"
                style={styles.input}
                secureTextEntry={secure}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                hitSlop={20}
                onPress={() => setSecure((prev) => !prev)}
                style={styles.icon}
              >
                <Ionicons
                  name={secure ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size={20} />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
