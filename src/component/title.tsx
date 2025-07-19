import { Text, View } from "react-native";
import * as Font from "expo-font";

export default function Title() {
  Font.loadAsync({
    LeagueGothic: require("../../assets/fonts/League_Gothic/LeagueGothic-Regular-VariableFont_wdth.ttf"),
    Monteserat: require("../../assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
  });

  return (
    <View className="flex items-center">
      <Text
        style={{
          fontFamily: "LeagueGothic",
        }}
        className="text-6xl"
      >
        DLL TAP-IN
      </Text>
      <Text
        style={{
          fontFamily: "Monteserat",
        }}
        className="text-md font-bold"
      >
        AUTOMATED ATTENDANCE SYSTEM
      </Text>
    </View>
  );
}
