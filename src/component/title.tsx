import { Text, View } from "react-native";

export default function Title() {
  return (
    <View className="flex flwx-col items-center justify-center w-full">
      <Text
        style={{
          fontFamily: "LeagueGothic",
        }}
        className="text-6xl w-full text-center justify-center items-center"
      >
        DLL TAP-IN
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontFamily: "Monteserat",
        }}
        className="text-md w-full text-center"
      >
        AUTOMATED ATTENDANCE SYSTEM
      </Text>
    </View>
  );
}
