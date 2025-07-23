import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Btn from "src/widgets/button";
import Title from "src/component/title";
import Scroller from "src/component/scroller";
import { RootStackParamList } from "types";
import Card from "src/component/card";
import Header from "src/component/header";
import { IconButton } from "react-native-paper";
import { Remove } from "src/control/data";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "LoggedIn">;
}

export default function LoggedIn({ navigation }: Props) {
  return (
    <View className="flex-1 w-full">
      <Header>
        <IconButton
          onPress={async () => {
            Remove("user");
            navigation.replace("Login");
          }}
          icon={require("../../assets/logout.png")}
          className="w-[25px] h-[25px]"
        />
      </Header>
      <Card className="gap-4">
        <View className="w-full items-center justify-center">
          <Text
            style={{
              fontFamily: "LeagueGothic",
            }}
            className="text-3xl"
          >
            Account management
          </Text>
          <Text>Please select your action.</Text>
        </View>
        <Scroller>
          <View className="w-full gap-2">
            <Btn
              onclick={() => {
                navigation.replace("QRGenerator");
              }}
            >
              Attend to an event
            </Btn>
            <Btn>Create an Event</Btn>
          </View>
        </Scroller>
      </Card>
    </View>
  );
}
