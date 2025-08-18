import { useState } from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";
import Card from "src/component/card";
import PageHeadings from "src/component/page_heading";
import Title from "src/component/title";
import { ForgotPasswordProps } from "src/interfaces/navigation_props";
import Button from "src/widgets/button";
import Input from "src/widgets/input";


// TODO: Function is still under development. We need an email account for this one
export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = async () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setMessage("Please enter a valid email");
    }
  };
  return (
    <View className="flex-1 w-full items-center pt-6 gap-4">
      <Title />
      <Card>
        <PageHeadings title="Forgot Password" subtitle="Change your password" />
        <View className="gap-4 w-full">
          <Input
            onchange={setEmail}
            label="Email Address"
            hint="myemail@gmail.com"
          />
          <Button onclick={sendMail}>Reset Password</Button>
        </View>
      </Card>
      <Snackbar
        visible={message.length > 0}
        onDismiss={() => setMessage("")}
        action={{
          label: "Close",
          onPress: () => setMessage(""),
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
}
