import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface spinner {
  label: string;
  data: any[];
  valueField: string;
  labelField: string;
  name?: string;
  placeholder?: string;
  onchange: (e: any) => void;
  value?: string | number;
}

export default function Spinner(props: spinner) {
  const capitalized = (text: string) => {
    text = text.replace(/_/g, " ");
    return text[0].toUpperCase() + text.substring(1);
  };

  const name = props.name
    ? props.name
    : props.label.replace(/\s/gi, "_").toLowerCase();

  return (
    <View className={`w-full`}>
      <Text className="text-sm">{capitalized(props.label)}</Text>
      <Dropdown
        onChange={props.onchange}
        value={props.value}
        placeholder={props.placeholder ?? props.label}
        data={props.data ?? []}
        valueField={props.valueField}
        labelField={props.labelField}
        style={{
          borderWidth: 2,
          borderColor: "rgba(0, 0, 0, 0.5)",
          padding: 8,
          borderRadius: 5,
        }}
      />
    </View>
  );
}
