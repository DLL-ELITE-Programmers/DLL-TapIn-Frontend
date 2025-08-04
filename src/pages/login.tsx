import { Switch, Text, View } from "react-native";
import Input from "src/widgets/input";
import Button from "src/widgets/button";
import { useState } from "react";
import Title from "src/component/title";
import { post_unauth } from "utils/access";
import { Snackbar } from "react-native-paper";
import { SetItem } from "src/control/data";
import Card from "src/component/card";
import { LoginProps } from "src/interfaces/navigation_props";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface loginForm {
  username: string;
  password: string;
}

export default function Login({ navigation }: LoginProps) {
  const [remember, setRemember] = useState(false);
  const [loginData, setLogin] = useState<loginForm>({
    username: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const login = async (navigation: any) => {
    const loginRegex = /^(\d+)([a-zA-Z]){1}-(\d+)$/i;

    // TODO: To check if there's input
    if (!loginData.username || !loginData.password) {
      setError("Please insert your Student ID and/or Password");
      setVisible(true);
      return;
    }

    // TODO: Student ID validation
    if (!loginRegex.test(loginData.username)) {
      setError("Please check your Student ID.");
      setVisible(true);
      return;
    }

    // TODO: Password validation
    if (loginData.password.length < 6) {
      setError("Password must be atleast 6 characters");
      setVisible(true);
      return;
    }

    // TODO: Accept all requirements
    setSending(true);
    const response = await post_unauth("users/login", loginData);

    if (response.error) {
      setError(response.error);
      setVisible(true);
      setSending(false);
    }
    if (response.message) {
      SetItem("user", response.user);
      navigation.replace("LoggedIn");
    }
  };

  return (
    <View className="flex-1 gap-6 items-center">
      <Title />
      <Card>
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
          onchange={(text) => {
            setLogin({ ...loginData, username: text });
          }}
          hint="012A-3456"
          label="Student ID"
          value={loginData.username}
        />
        <Input
          onchange={(text) => {
            setLogin({ ...loginData, password: text });
          }}
          value={loginData.password}
          label="Password"
          password={true}
        />
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center">
            <Switch
              value={remember}
              onValueChange={(val: boolean) => {
                setRemember(val);
              }}
            />
            <Text
              className="font-xs"
              onPress={() => {
                setRemember((prev) => !prev);
              }}
            >
              {remember ? "Remembered" : "Remember me"}
            </Text>
          </View>
          <Text
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            className="underline font-xs"
          >
            Forgot password
          </Text>
        </View>

        <View className="w-full mt-4">
          <Button
            onclick={() => {
              login(navigation);
            }}
            loading={sending}
          >
            Log in
          </Button>
        </View>
      </Card>
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
