import { View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import Scroller from "src/component/scroller";
import { EditAccountProps } from "src/interfaces/navigation_props";
import Input from "src/widgets/input";

export default function EditAccount({ navigation }: EditAccountProps) {
  return (
    <View className="flex-1">
      <Header />
      <Card>
        <PageHeadings
          title="Edit Account"
          subtitle="Modify your account information here"
        />
        <Scroller>
          <Input label="Email" />
        </Scroller>
      </Card>
    </View>
  );
}
