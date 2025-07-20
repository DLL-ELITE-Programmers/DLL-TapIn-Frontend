import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-qr-code";
import { GetItem } from "src/control/data";
import { RootStackParamList, UserProps } from "types";

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
    <View className="flex-1 justify-center items-center p-4">
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
  );
}
