import { Image, Text, View } from "react-native";
import Logo from "../../assets/dll_logo.png";

export default function Header() {
  return (
    <View className="flex flex-row w-full h-[60px] bg-blue-50 py-1 px-2 gap-3">
      <Image
        className="h-[50px] w-[50px] aspect-square rounded-full"
        source={Logo}
      />
      <View className="flex flex-col h-full justify-center">
        <Text>TapIn</Text>
        <Text>Developed by DLL BSIT Team</Text>
      </View>
    </View>
  );
}
