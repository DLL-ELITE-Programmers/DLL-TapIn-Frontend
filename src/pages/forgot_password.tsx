import { useState } from "react";
import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import Card from "src/component/card";
import PageHeadings from "src/component/page_heading";
import Title from "src/component/title";
import { ForgotPasswordProps } from "src/interfaces/navigation_props";
import Btn from "src/widgets/button";
import Input from "src/widgets/input";

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
      <Card>
        <PageHeadings title="Forgot Password" subtitle="Change your password" />
        <View className="gap-4 w-full">
          <Input
            onchange={setEmail}
            label="Email Address"
            hint="myemail@gmail.com"
          />
          <Btn onclick={sendMail}>Reset Password</Btn>
        </View>
      </Card>
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
