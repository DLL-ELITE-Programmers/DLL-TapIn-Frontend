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

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const login = async (navigation: any) => {
    const loginRegex = /^(\d+)([a-zA-Z]){1}-(\d+)$/i;

    // TODO: To check if there's input
    if (!loginData.username || !loginData.password) {
      setError("Please insert your Student ID and/or Password");
      return;
    }

    // TODO: Polishing ID
    const username = loginData.username.replace(/([\W\s]+)/gi, "");
    const user = username.substring(0, 4) + "-" + username.substring(4);
    loginData.username = user;

    // TODO: Student ID validation
    if (!loginRegex.test(loginData.username)) {
      setError("Please check your Student ID.");
      return;
    }

    // TODO: Password validation
    if (loginData.password.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }

    // TODO: Accept all requirements
    setSending(true);
    const response = await post_unauth("users/login", loginData);

    if (response.error) {
      setError(response.error);
      setSending(false);
    } else if (response.message) {
      const user = response.user;
      user.remember = remember;
      SetItem("user", user);
      navigation.replace("LoggedIn");
    } else {
      setError(
        "There's having a problem with the connection, please try again later.",
      );
      setSending(false);
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
          editable={!sending}
        />
        <Input
          onchange={(text) => {
            setLogin({ ...loginData, password: text });
          }}
          value={loginData.password}
          label="Password"
          password={true}
          editable={!sending}
        />
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center">
            <Switch
              disabled={!sending}
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
        visible={error.length > 0}
        onDismiss={() => setError("")}
        action={{
          label: "Close",
          onPress: () => {
            setError("");
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
