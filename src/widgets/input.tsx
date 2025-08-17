import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";

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
  editable?: boolean;
}

export default function Input(props: input) {
  const [showPass, setShowPass] = useState(props.password);
  const [textShow, setText] = useState("Show");
  const [isFocused, setFocused] = useState(false);

  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  useEffect(() => {
    if (props.password) {
      setShowPass(true);
    }
  }, [props.editable]);

  return (
    <View className={`w-full`}>
      <Text
        className={`text-sm ${isFocused ? "text-blue-700" : "text-black"}`}
        style={{
          fontFamily: "Monteserat",
          fontWeight: "bold",
        }}
      >
        {capitalized(props.label)}
      </Text>
      <View
        className={`flex flex-row gap-1 border-[2px] rounded-[5px] ${isFocused ? "border-[#60affe]" : "border-[#00000090]"}`}
      >
        <TextInput
          multiline={props.multiline ?? false}
          numberOfLines={props.maxline ?? 5}
          onChangeText={props.onchange}
          value={props.value}
          placeholder={props.hint}
          secureTextEntry={showPass}
          textContentType={props.type ?? "none"}
          className="p-2 flex-1"
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          editable={props.editable ?? true}
        />
        {props.password ? (
          <Text
            onPress={() => {
              if (props.editable) {
                setShowPass((prev) => !prev);
                setText(showPass ? "Hide" : "Show");
              }
            }}
            className="p-2 w-[50px] align-middle text-center h-full items-center justify-center"
            accessibilityLabel={textShow}
          >
            <Image
              className="w-[25px] h-[25px]"
              width={25}
              height={25}
              source={
                showPass
                  ? require("assets/eye.png")
                  : require("assets/hidden.png")
              }
            />
          </Text>
        ) : null}
      </View>
    </View>
  );
}
