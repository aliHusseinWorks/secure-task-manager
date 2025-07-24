import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useAuth } from "../context";
import { useTheme } from "../context/theme.context";

const Header = ({ navigation }: { navigation: any }) => {
  const { logout } = useAuth();
  const { mode, toggleTheme, theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.header}>
      <StatusBar
        barStyle={mode !== "dark" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      <Text style={[styles.title, { color: theme.text }]}>Tasks</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.iconBtn}
          accessibilityLabel="Toggle theme"
        >
          <Text style={styles.icon}>{mode === "dark" ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.iconBtn}
          accessibilityLabel="Logout"
        >
          <Text style={[styles.icon, { color: theme.error }]}>⎋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
});
