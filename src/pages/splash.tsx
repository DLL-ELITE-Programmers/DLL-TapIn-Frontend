import { useEffect, useState } from "react";
import { Alert, AlertButton, Image, Linking, Text, View } from "react-native";
import Title from "src/component/title";
import { GetItem } from "src/control/data";
import { SplashProps } from "src/interfaces/navigation_props";
import { UserProps } from "types";
import { get_unauth } from "utils/access";

import Contants from "expo-constants";

// NOTE: This is crucial key for future updates
// TODO: If the update is required to the specific version
// kindly add +1 to the value given below if you
// require the update, this is to make
// all the version safe up to the latest feature added
// to the application, as well as to maintain the
// required feature for future updates, kindly check the
// core/viewsets/updates.py on the backend part.
const currentVersion = 0;

export default function Splash({ navigation }: SplashProps) {
  const [data, setData] = useState<UserProps>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_superuser: false,
  });
  const [update, setUpdate] = useState(false);
  const [needed, setNeeded] = useState(0);

  useEffect(() => {
    (async () => {
      const version = Contants.manifest2.extra.expoClient.version;
      const response = await get_unauth("updates");
      if (response.version !== version) {
        const buttons: AlertButton[] = [
          {
            text: "Update",
            onPress: async () => {
              await Linking.openURL(response.link);
            },
          },
        ];
        if (!response.require) {
          buttons.push({
            text: "Cancel",
          });
        }
        Alert.alert(
          "New Verson Update",
          `${response.message}\n\n${response.new.join("\n")} `,
          buttons,
          {
            cancelable: response.require >= currentVersion,
          },
        );
        setNeeded(response.require);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await GetItem("user");
      const info = await get_unauth("users/self", response);
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
  }, [update]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentVersion >= needed) {
        if (data.username) {
          navigation.replace("LoggedIn");
        } else {
          navigation.replace("Hero");
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, needed]);

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
