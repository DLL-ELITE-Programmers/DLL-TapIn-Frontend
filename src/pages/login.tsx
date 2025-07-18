import { Switch, Text, View } from "react-native";
import Input from "../widgets/input";
import Btn from "../widgets/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-[2rem]">QR Tap In</Text>
      <View className="gap-2 w-full px-10 bg-slate-200 items-center justify-center p-4 rounded-md">
        <Text className="text-3xl font-bold">Login</Text>
        <Text>Don't have an account yet?</Text>{" "}
        <Text className="underline" onPress={() => {navigation.navigate("Signup")}}>Baka di pa pa talaga nag eexists</Text>
        <Input hint="012A-3456" label="Student ID" />
        <Input label="Password" password={true} />
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center">
            <Switch value={false} />
            <Text>Remember me</Text>
          </View>
          <Text className="underline">Forgot password</Text>
        </View>
        <Btn>Log in</Btn>
      </View>
    </View>
  );
}
