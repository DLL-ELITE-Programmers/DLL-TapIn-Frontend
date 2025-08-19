import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Title from "src/component/title";
import { GetItem } from "src/control/data";
import { HeroProps } from "src/interfaces/navigation_props";
import Button from "src/widgets/button";
import { UserProps } from "types";

export default function Hero({ navigation }: HeroProps) {
  const [required, setRequired] = useState(false);
  const [data, setData] = useState<UserProps>();

  useEffect(() => {
    (async () => {
      const user = await GetItem("user");
      setData(user);
      const update = await GetItem("updates");
      setRequired(update);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.username && data?.remember) {
        navigation.replace("LoggedIn");
      }
    }
  }, [data]);

  return (
    <View className="flex flex-col w-full flex-1 p-4 items-center justify-center gap-4 pb-6">
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

        <View className="w-full mt-10">
          {required ? (
            <View className="items-center">
              <Text className="font-bold text-lg">
                Please do update the app first, before you continue.
              </Text>
              <Text className="font-bold italic">
                This update is required, so please update it first.
              </Text>
            </View>
          ) : (
            <Button
              onclick={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </Button>
          )}
        </View>
      </View>
      {required ? null : (
        <View className="flex flex-row justify-end">
          <Text>Don't have an account? </Text>
          <Text
            onPress={() => {
              navigation.navigate("Signup");
            }}
            className="underline font-bold text-blue-600"
          >
            Sign up
          </Text>
        </View>
      )}
    </View>
  );
}
