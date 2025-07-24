import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import QRCode from "react-qr-code";
import Header from "src/component/header";
import { GetItem, Remove } from "src/control/data";
import { RootStackParamList, UserProps } from "types";
import { IconButton } from "react-native-paper";
import Card from "src/component/card";

type QRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QRGenerator"
>;

interface Props {
  navigation: QRScreenNavigationProp;
}

export default function QRGenerator({ navigation }: Props) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<UserProps>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_superuser: false,
  });

  useEffect(() => {
    (async () => {
      const data = await GetItem("user");
      setUser(data);

      const dataToken = await GetItem("token")
      setToken(dataToken)
    })();
  }, []);

  return (
    <View className="flex-1 items-center">
      <Header>
        <IconButton
          onPress={async () => {
            Remove("user");
            navigation.replace("Login");
          }}
          icon={require("../../assets/logout.png")}
          className="w-[25px] h-[25px]"
        />
      </Header>
      <View className="flex-1 w-full justify-center items-center p-4">
        <Card className="gap-4">
          <View className="w-full items-center justify-center">
            <Text
              style={{
                fontFamily: "LeagueGothic",
              }}
              className="text-3xl"
            >
              User information
            </Text>
            <Text>
              Please let the organizer scan this QR Code for your attendance.
            </Text>
          </View>
          <QRCode size={256} value={token} viewBox={"0 0 256 256"} />
          <View className="w-full ">
            <Text>Student ID: {user.username}</Text>
            <Text>
              Name: {user.last_name}, {user.first_name} {user.middle_name ?? ""}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
}
