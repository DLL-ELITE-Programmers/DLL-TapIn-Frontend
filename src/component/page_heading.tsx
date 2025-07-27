import { Text, View } from "react-native";

interface PageHeadingsProps {
  title: string;
  subtitle?: string;
}

export default function PageHeadings(props: PageHeadingsProps) {
  return (
    <View className="w-full gap-2 items-center justify-center text-center">
      <Text
        style={{
          fontFamily: "LeagueGothic",
          textAlign: "center",
        }}
        className="text-3xl"
      >
        {props.title}
      </Text>
      <Text
        style={{
          fontFamily: "Monteserat",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {props.subtitle}
      </Text>
    </View>
  );
}
