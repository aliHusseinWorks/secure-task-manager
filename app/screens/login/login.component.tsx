import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import LoadingSpinner from "../../components/loadingSpinner";
import {
  login as loginService,
  biometricLogin,
} from "../../services/auth.service";
import { useAuth, useTheme } from "../../context";
import { TextField } from "../../components";

const LoginComponent = ({ navigation }: any) => {
  const { isAuthenticated, login } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [biometricType, setBiometricType] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("Home");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    (async () => {
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType("Touch ID");
      } else if (
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setBiometricType("Face ID");
      } else if (types.length > 0) {
        setBiometricType("Biometrics");
      } else {
        setBiometricType(null);
      }
    })();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginService(username, password);
      await login(token);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setLoading(true);
    try {
      const success = await biometricLogin();
      if (success) {
        await login("dummy-jwt-token");
      } else {
        setError("Biometric authentication failed");
      }
    } catch (err: any) {
      setError("Biometric authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Secure Task Manager
      </Text>
      <TextField
        style={[
          styles.input,
          { backgroundColor: theme.input, color: theme.text },
        ]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextField
        style={[
          styles.input,
          { backgroundColor: theme.input, color: theme.text },
        ]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? (
        <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
      ) : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.buttonsContainer}>
          <Button title="Login" onPress={handleLogin} />
          {biometricType && (
            <Button
              title={`Login with ${biometricType}`}
              onPress={handleBiometricLogin}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "6%",
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: "4%",
  },
  error: {
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 12,
    justifyContent: "space-between",
  },
});
