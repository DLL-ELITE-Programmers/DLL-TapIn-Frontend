import {
  ImageBackground,
  Switch,
  Text,
  TextInputProps,
  View,
} from "react-native";
import Input from "../widgets/input";
import Btn from "../widgets/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useState } from "react";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View className="flex-1 niggs justify-center items-center p-4">
      <View className="gap-2 w-full px-10 bg-white shadow-black shadow-md items-center justify-center p-4 rounded-md">
        <Text className="text-3xl font-bold">Login</Text>
        <View className="flex flex-row">
          <Text>Don't have an account yet? </Text>
          <Text
            className="underline"
            onPress={() => {
              navigation.replace("Signup");
            }}
          >
            Signup
          </Text>
        </View>
        <Input
          onchange={(e) => {
            setStudentID(e);
          }}
          hint="012A-3456"
          label="Student ID"
          value={studentID}
        />
        <Input
          onchange={(e) => {
            setPassword(e);
          }}
          value={password}
          label="Password"
          password={true}
        />
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center">
            <Switch
              value={rememberMe}
              onValueChange={(val: boolean) => {
                setRememberMe(val);
              }}
            />
            <Text
              onPress={() => {
                setRememberMe((prev) => !prev);
              }}
            >
              {rememberMe ? "Remembered" : "Remember me"}
            </Text>
          </View>
          <Text className="underline">Forgot password</Text>
        </View>
        <Btn>Log in</Btn>
      </View>
    </View>
  );
}
