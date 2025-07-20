import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Title from "src/component/title";
import Btn from "src/widgets/button";
import Input from "src/widgets/input";
import { RootStackParamList } from "types";

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

export default function ForgotPassword({ navigation }: Props) {
  return (
    <View className="flex-1 w-full items-center p-4 gap-4">
      <Title />
      <View className="bg-white w-full p-4 gap-2 rounded-md shador-black shadow-md">
        <Text
          style={{
            fontFamily: "LeagueGothic",
          }}
          className="text-3xl w-full text-center"
        >
          Forgot password
        </Text>
        <Text className="text-md w-full text-center">Change your password</Text>
        <View className="gap-4">
          <Input label="Email Address" />
          <Btn>Reset Password</Btn>
        </View>
      </View>
    </View>
  );
}
