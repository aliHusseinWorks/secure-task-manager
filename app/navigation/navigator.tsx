import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginComponent from "../screens/login/login.component";
import HomeComponent from "../screens/home/home.component";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="Home" component={HomeComponent} />
    </Stack.Navigator>
  );
};
