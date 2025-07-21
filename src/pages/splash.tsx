import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Title from "src/component/title";
import { GetItem } from "src/control/data";
import { RootStackParamList, UserProps } from "types";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export default function Splash({ navigation }: Props) {
  const [data, setData] = useState<UserProps>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_superuser: false,
  });

  useEffect(() => {
    (async () => {
      const response = await GetItem("user");
      setData(response);
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.username) {
        navigation.replace("QRGenerator");
      } else {
        navigation.replace("Hero");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <View className="flex-1 w-full justify-center items-center">
      <View className="w-full gap-4 justify-center items-center flex-1">
        <View className="w-1/3 aspect-square">
          <Image
            className="w-full h-full"
            source={require("../../assets/dll_logo.png")}
          />
        </View>
        <Title />
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: "Monteserat",
          }}
          className="text-md w-full text-center"
        >Developed by BSIT Department</Text>
      </View>
    </View>
  );
}
