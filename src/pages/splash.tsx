import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Title from "src/component/title";
import { GetItem } from "src/control/data";
import { SplashProps } from "src/interfaces/navigation_props";
import { UserProps } from "types";
import { get_unauth } from "utils/access";

export default function Splash({ navigation }: SplashProps) {
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
      const info = await get_unauth("users/self", {
        token: response,
      });
      if (info.error) {
        setData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          is_superuser: false,
        });
      } else {
        setData(response);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.username) {
        navigation.replace("LoggedIn");
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
        >
          Developed by BSIT Department
        </Text>
      </View>
    </View>
  );
}
