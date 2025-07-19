import { Image, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="flex flex-row w-full h-[50px] bg-[#fff]">
      <Image
        className="h-full aspect-square"
        source={require("@/assets/dll_logo.png")}
      />
      <View className="flex flex-col">
        <Text>Title</Text>
        <Text>Subtitle</Text>
      </View>
    </View>
  );
}
