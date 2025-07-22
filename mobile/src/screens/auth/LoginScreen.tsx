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
import useAuth from "../../providers/hooks/useAuth";
import styles from "./LoginScreen.styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  const { login, error, loading } = useAuth();
  const [name, setName] = useState("waiter"); // cooker
  const [pass, setPass] = useState("waiter"); // cooker
  const [showPassword, setShowPassword] = useState(false);

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

            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                style={styles.input}
                placeholderTextColor="#000"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#000"
                secureTextEntry={!showPassword} 
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 12 }}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.textErr}>{error}</Text>}


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
