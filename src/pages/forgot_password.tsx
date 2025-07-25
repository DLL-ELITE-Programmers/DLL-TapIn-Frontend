import { useState } from "react";
import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import Title from "src/component/title";
import Btn from "src/widgets/button";
import Input from "src/widgets/input";
import { ForgotPasswordProps } from "src/interfaces/navigation_props"

export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const sendMail = async () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setError("Please enter a valid email");
      setVisible(true);
    }
  };

  return (
    <View className="flex-1 w-full items-center pt-6 p-4 gap-4">
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
          <Input
            onchange={setEmail}
            label="Email Address"
            hint="myemail@gmail.com"
          />
          <Btn onclick={sendMail}>Reset Password</Btn>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Close",
          onPress: () => setVisible(false),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
