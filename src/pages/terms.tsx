import { Text, View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import Scroller from "src/component/scroller";
import { TermsProps } from "src/interfaces/navigation_props";

export default function Terms({ navigation }: TermsProps) {
  return (
    <View className="flex-1 w-full gap-2">
      <Header />
      <Card>
        <PageHeadings title="Terms and Conditions" />
        <Text className="text-center">
          Bakit pa ako gagawa kung hindi mo rin naman babasahin
        </Text>
      </Card>
    </View>
  );
}
