import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import QRCode from "react-qr-code";
import Header from "src/component/header";
import { GetItem, Remove } from "src/control/data";
import { RootStackParamList, UserProps } from "types";
import { IconButton } from "react-native-paper";

type QRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QRGenerator"
>;

interface Props {
  navigation: QRScreenNavigationProp;
}

export default function QRGenerator({ navigation }: Props) {
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
        <View className="gap-2 w-full px-10 bg-white shadow-black shadow-md items-center justify-center p-4 rounded-md">
          <QRCode
            size={256}
            value={JSON.stringify(user)}
            viewBox={"0 0 256 256"}
          />
          <View className="text-center w-full items-center justify-center">
            <Text>{user.username}</Text>
            <Text>
              {user.last_name}, {user.first_name} {user.middle_name ?? ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
