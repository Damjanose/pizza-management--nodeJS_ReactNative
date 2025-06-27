import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useAuth from "../../providers/hooks/useAuth.ts";
import styles from "./LoginScreen.styles.ts";

export default function LoginScreen() {
  const { login, error, loading } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
        {error && <Text style={styles.textErr}>{error}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
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
  );
}
