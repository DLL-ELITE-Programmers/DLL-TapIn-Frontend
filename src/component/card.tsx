import { ReactNode } from "react";
import { View } from "react-native";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card(props: CardProps) {
  return (
    <View className="w-full p-3 flex-1">
      <View
        className={`gap-2 w-full bg-white shadow-black shadow-sm items-center justify-center p-4 rounded-md ${props.className ?? ""}`}
      >
        {props.children}
      </View>
    </View>
  );
}
