import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { View } from "react-native";

interface input {
  label: string;
  password?: boolean;
  hint?: string;
  value?: string;
  onchange?: (e: string) => void;
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
      <Text className="text-sm">{capitalized(props.label)}</Text>
      <View className="flex flex-row gap-1">
        <TextInput
          onChangeText={props.onchange}
          value={props.value}
          placeholder={props.hint}
          secureTextEntry={showPass}
          className="border-[2px] border-black/50 focus:border-[#60affe] rounded-[5px] p-2 flex-1"
        />
        {props.password ? (
          <Button
            className=""
            onPress={() => {
              setShowPass((prev) => !prev);
              setText(showPass ? "Hide" : "Show");
            }}
            title={textShow}
          >
            {textShow}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
