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
        className="border-[2px] border-solid border-[#333333] p-4 focus:border-[#60affe] rounded-[5px]"
      />
    </View>
  );
}
