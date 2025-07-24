import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { useTheme } from "../context/theme.context";

const TextField = (props: TextInputProps) => {
  const { theme, mode } = useTheme();
  return (
    <TextInput
      {...props}
      style={[{ backgroundColor: theme.input, color: theme.text }, props.style]}
      placeholderTextColor={theme.placeholder}
      keyboardAppearance={mode}
    />
  );
};

export default TextField;
