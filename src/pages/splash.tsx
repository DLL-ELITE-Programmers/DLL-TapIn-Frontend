import { useEffect, useState } from "react";
import { Alert, AlertButton, Image, Linking, Text, View } from "react-native";
import Title from "src/component/title";
import { GetItem, SetItem } from "src/control/data";
import { SplashProps } from "src/interfaces/navigation_props";
import { UserProps } from "types";
import { get_unauth } from "utils/access";
import * as packageJSON from 'package.json'

import Contants from "expo-constants";

// NOTE: This is crucial key for future updates
// TODO: If the update is required to the specific version
// kindly add +1 to the value given below if you
// require the update, this is to make
// all the version safe up to the latest feature added
// to the application, as well as to maintain the
// required feature for future updates, kindly check the
// core/viewsets/updates.py on the backend part.
const currentVersion = -1;

// TODO: This is to make the value auto update
const versionName = "0.1.0"
export default function Splash({ navigation }: SplashProps) {
  const [data, setData] = useState<UserProps>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    sex: 0,
    remember: false
  });

  const [needed, setNeeded] = useState(currentVersion);

  useEffect(() => {
    (async () => {
      const vn = packageJSON.version
      const version = Contants?.manifest2?.extra?.expoClient?.version ?? vn;
      const response = await get_unauth("updates");
      const ver = response.version;
      setNeeded(ver ?? currentVersion);
      SetItem("updates", response.require > currentVersion);
      if (ver !== version) {
        const buttons: AlertButton[] = [
          {
            text: "Update",
            onPress: async () => {
              await Linking.openURL(response.link);
            },
          },
        ];
        if (response.require <= currentVersion) {
          buttons.push({
            text: "Cancel",
          });
        }

        const added: string[] = [];
        const objs = Object.keys(response.new);
        for (const n of objs) {
          // TODO: This is to get all the latest changelogs from the current version
          if (n === version) {
            break;
          }
          added.push(`${n}:\n${response.new[n].join("\n")}`);
        }
        Alert.alert(
          "New Verson Update",
          `${version}\n${response.message}\n\n${added.join("\n\n")} `,
          buttons,
          {
            cancelable: response.require <= currentVersion,
          },
        );
      }
      setNeeded(response.require);
    })();

    // TODO: This code will trigger, if the user information is stored and wanted to remmeber
    const timer = setTimeout(() => {
      if (currentVersion >= needed) {
        if (data.username && data.remember) {
          navigation.replace("LoggedIn")
        } else {
          navigation.replace("Hero");
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // TODO: Remember me function
    (async () => {
      const response = await GetItem("user");
      if (response.remember) {
        // const info = await get_unauth("users/self", response);
        // if (info.error) {
        //   setData({
        //     username: "",
        //     first_name: "",
        //     last_name: "",
        //     email: "",
        //     sex: 0
        //   });
        // } else {
        setData(response);
        // }
      }
    })();
  }, []);

  return (
    <View className="flex-1 w-full justify-center items-center">
      <View className="w-full gap-4 justify-center items-center flex-1">
        <View className="flex items-center w-1/3 aspect-square">
          <Image
            className="w-[150px] h-[150px]"
            source={require("../../assets/dll_logo.png")}
            width={100}
            height={100}
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
