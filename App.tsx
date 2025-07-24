import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider, AuthProvider } from "./app/context";
import { Navigator } from "./app/navigation/navigator";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
