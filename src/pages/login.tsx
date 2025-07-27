import { Switch, Text, View } from "react-native";
import Input from "src/widgets/input";
import Btn from "src/widgets/button";
import { useState } from "react";
import Title from "src/component/title";
import { post_unauth } from "utils/access";
import { Snackbar } from "react-native-paper";
import { SetItem } from "src/control/data";
import Card from "src/component/card";
import { LoginProps } from "src/interfaces/navigation_props";

export default function Login({ navigation }: LoginProps) {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const login = async (navigation: LoginScreenNavigationProp) => {
    if (!studentID || !password) {
      setError("Please insert your Student ID and/or Password");
      setVisible(true);
    }
    setSending(true);
    const response = await post_unauth("users/login", {
      username: studentID,
      password: password,
    });

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
    <View className="flex-1 gap-6 items-center p-4">
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
        {sending ? null : (
          <View className="w-full mt-4">
            <Btn
              onclick={() => {
                login(navigation);
              }}
            >
              Log in
            </Btn>
          </View>
        )}
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
