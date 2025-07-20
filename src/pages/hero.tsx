import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import Title from "src/component/title";
import Btn from "src/widgets/button";
import { RootStackParamList } from "types";

type HeroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Hero"
>;

interface Props {
  navigation: HeroScreenNavigationProp;
}

export default function Hero({ navigation }: Props) {
  return (
    <View className="flex flex-col w-full flex-1 p-4 items-center justify-center gap-4 pb-6">
      <View className="w-full gap-4 justify-center items-center flex-1">
        <View className="w-1/3 aspect-square">
          <Image
            className="w-full h-full"
            source={require("../../assets/dll_logo.png")}
          />
        </View>
        <Title />

        <View className="w-full mt-10">
          <Btn
            onclick={() => {
              navigation.navigate("Login");
            }}
          >
            Login
          </Btn>
        </View>
      </View>
      <View className="flex flex-row justify-end">
        <Text>Don't have an account? </Text>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
          }}
          className="underline font-bold text-blue-600"
        >
          Sign up
        </Text>
      </View>
    </View>
  );
}
