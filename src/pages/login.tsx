import { Switch, Text, View } from "react-native";
import Input from "src/widgets/input";
import Btn from "src/widgets/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";
import { useState } from "react";
import Title from "src/component/title";
import { post_unauth } from "utils/access";
import { Snackbar } from "react-native-paper";
import { SetItem } from "src/control/data";

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

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  // Font.loadAsync({
  //   "LeagueGothic": require("../../assets/fonts/League_Gothic/LeagueGothic-Regular-VariableFont_wdth.ttf")
  // })

  const login = async (navigation: LoginScreenNavigationProp) => {
    if (!studentID || !password) {
      setError("Please insert your Student ID and/or Password");
      setVisible(true);
    }
    const response = await post_unauth("users/login", {
      username: studentID,
      password: password,
    });
    if (response.error) {
      setError(response.error);
      setVisible(true);
    }
    if (response.message) {
      SetItem("user", response.user);
      navigation.replace("QRGenerator");
    }
  };

  return (
    <View className="flex-1 gap-6 items-center p-4">
      <Title />
      <View className="gap-2 w-full px-10 bg-white shadow-black shadow-md items-center justify-center p-4 rounded-md">
        <Text
          style={{
            fontFamily: "LeagueGothic",
          }}
          className="text-3xl"
        >
          Login
        </Text>
        <View className="flex flex-row">
          <Text>Don't have an account yet? </Text>
          <Text
            className="underline text-blue-700 font-bold"
            onPress={() => {
              navigation.replace("Signup");
            }}
          >
            Signup
          </Text>
        </View>
        <Input
          onchange={setStudentID}
          hint="012A-3456"
          label="Student ID"
          value={studentID}
        />
        <Input
          onchange={setPassword}
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
          <Text
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            className="underline"
          >
            Forgot password
          </Text>
        </View>
        <View className="w-full mt-4">
          <Btn
            onclick={() => {
              login(navigation);
            }}
          >
            Log in
          </Btn>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
