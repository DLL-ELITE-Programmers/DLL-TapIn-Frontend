import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import QRCode from "react-qr-code";
import { RootStackParamList } from "types";

type QRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QRGenerator"
>;

interface Props {
  navigation: QRScreenNavigationProp;
}

export default function QRGenerator({ navigation }: Props) {
  return (
    <View>
      <QRCode size={256} value={"Hello World"} viewBox={"0 0 256 256"} />
    </View>
  );
}
