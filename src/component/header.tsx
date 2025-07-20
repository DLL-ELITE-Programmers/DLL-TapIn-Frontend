import { Image, Text, View } from "react-native";
import Logo from "../../assets/dll_logo.png";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Header({ children }: Props) {
  return (
    <View className="flex flex-row w-full h-[60px] bg-blue-50 py-1 px-2 gap-3 justify-between items-center">
      <View className="flex flex-row">
        <Image
          className="h-[50px] w-[50px] aspect-square rounded-full"
          source={Logo}
        />
        <View className="flex flex-col h-full justify-center">
          <Text>DLL Tap-In</Text>
          <Text>Developed by DLL BSIT Team</Text>
        </View>
      </View>
      <View>{children}</View>
    </View>
  );
}
