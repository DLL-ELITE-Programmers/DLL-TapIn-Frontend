import { Text, TextInput, TextInputProps } from "react-native";
import { View } from "react-native";

interface input {
  label: string;
  password?: boolean;
  hint?: string;
  value?: string;
  onchange?: (e: string) => void;
}

export default function Input(props: input) {
  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  return (
    <View className={`w-full`}>
      <Text className="text-sm">{capitalized(props.label)}</Text>
      <TextInput
        onChangeText={props.onchange}
        value={props.value}
        placeholder={props.hint}
        secureTextEntry={props.password ?? false}
        className="border-[2px] border-black/50 focus:border-[#60affe] rounded-[5px] p-2"
      />
    </View>
  );
}
