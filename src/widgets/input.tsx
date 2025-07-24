import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface input {
  label: string;
  password?: boolean;
  hint?: string;
  value?: string;
  onchange?: (e: string) => void;
  type?: React.ComponentProps<typeof TextInput>["textContentType"];
}

const EyeIcon = () => (
  <Ionicons name="eye-outline" size={18} color="#6B7280" />
);

const EyeOffIcon = () => (
  <Ionicons name="eye-off-outline" size={18} color="#6B7280" />
);

export default function Input(props: input) {
  const [showPass, setShowPass] = useState(props.password ? true : false);

  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  const togglePasswordVisibility = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <View className="w-full">
      <Text className="text-sm">{capitalized(props.label)}</Text>
      <View className="relative">
        <TextInput
          onChangeText={props.onchange}
          value={props.value}
          placeholder={props.hint}
          secureTextEntry={showPass}
          textContentType={props.type ?? "none"}
          className="border-[1px] focus:border-[#000] focus:border-[2px] rounded-[10px] p-4 py-3 pr-12"
          style={props.password ? { paddingRight: 40 } : {}}
        />
        {props.password && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: [{ translateY: -9 }],
              zIndex: 1,
            }}
            activeOpacity={0.7}
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}