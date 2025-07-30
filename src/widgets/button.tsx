import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LoaderKitView } from "react-native-loader-kit";

interface button {
  children: string;
  onclick?: () => void;
  loading?: boolean;
}

export default function Btn(props: button) {
  return (
    <View className="w-full">
      <TouchableOpacity
        className="w-full bg-blue-500 rounded-sm items-center p-3"
        onPress={props.onclick}
        disabled={props.loading ?? false}
      >
        {props.loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-semibold">{props.children}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
