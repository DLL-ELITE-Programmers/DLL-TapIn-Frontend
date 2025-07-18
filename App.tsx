import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View, StatusBar as sb } from "react-native";
import Page from "./src/pages/index";

export default function App() {

  return (
    <View className="flex flex-col bg-[#ffffff] w-full h-full">
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
