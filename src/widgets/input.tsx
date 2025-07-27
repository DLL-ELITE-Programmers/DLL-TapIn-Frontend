import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

interface input {
  label: string;
  password?: boolean;
  hint?: string;
  value?: string;
  multiline?: boolean;
  maxline?: number;
  onchange?: (e: string) => void;
  type?: React.ComponentProps<typeof TextInput>["textContentType"];
  required?: boolean;
}

export default function Input(props: input) {
  const [showPass, setShowPass] = useState(props.password);
  const [textShow, setText] = useState("Show");

  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  return (
    <View className={`w-full`}>
      <Text
        className="text-sm"
        style={{
          fontFamily: "Monteserat",
          fontWeight: "bold",
        }}
      >
        {capitalized(props.label)}
      </Text>
      <View className="flex flex-row gap-1">
        <TextInput
          multiline={props.multiline ?? false}
          numberOfLines={props.maxline ?? 5}
          onChangeText={props.onchange}
          value={props.value}
          placeholder={props.hint}
          secureTextEntry={showPass}
          textContentType={props.type ?? "none"}
          className="border-[2px] border-black/50 focus:border-[#60affe] rounded-[5px] p-2 flex-1"
        />
        {props.password ? (
          <Button
            color="transparent"
            onPress={() => {
              setShowPass((prev) => !prev);
              setText(showPass ? "Hide" : "Show");
            }}
            accessibilityLabel={textShow}
            title={textShow}
          />
        ) : null}
      </View>
    </View>
  );
}
