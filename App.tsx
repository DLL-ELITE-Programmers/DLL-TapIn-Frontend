import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Page from "./src/pages/index";
import * as Font from "expo-font";

export default function App() {
  Font.loadAsync({
    LeagueGothic: require("./assets/fonts/League_Gothic/LeagueGothic-Regular-VariableFont_wdth.ttf"),
    Monteserat: require("./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
  });

  return (
    <View className="flex flex-col flex-1 bg-[#ffffff] w-full h-full">
      <StatusBar style="auto" />
      {/* NOTE: mt-[30px] was the one who created the gap for the statusbar */}
      <View
        className={`bg-slate-900 android:mt-[30px] ios:mt-[30px] w-full h-full flex-1 items-center justify-center`}
      >
        <Page />
      </View>
    </View>
  );
}
