import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface spinner {
  label: string;
  data: any[];
  valueField: string;
  labelField: string;
  placeholder?: string;
  onchange: (e: any) => void;
  value?: string | number;
  changeable?: boolean;
}

export default function Spinner(props: spinner) {
  const [isFocused, setFocus] = useState(false);
  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  return (
    <View className={`w-full`}>
      <Text
        style={{
          fontFamily: "Monteserat",
          fontWeight: "bold",
        }}
        className={`text-sm ${isFocused ? "text-blue-700" : "text-black"}`}
      >
        {capitalized(props.label)}
      </Text>
      <View
        className={`border-2 p-2 rounded-md ${isFocused ? "border-blue-700" : "border-[#00000090]"}`}
      >
        <Dropdown
          onChange={props.onchange}
          value={props.value}
          placeholder={props.placeholder ?? props.label}
          data={props.data ?? []}
          valueField={props.valueField}
          labelField={props.labelField}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          disable={!(props.changeable ?? true)}
        />
      </View>
    </View>
  );
}
