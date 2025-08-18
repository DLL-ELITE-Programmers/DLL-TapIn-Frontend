import { Text, View } from "react-native";
import Button from "src/widgets/button";
import Scroller from "src/component/scroller";
import Card from "src/component/card";
import Header from "src/component/header";
import { LoggedInProps } from "src/interfaces/navigation_props";
import PageHeadings from "src/component/page_heading";
import { Remove } from "src/control/data";
import { useEffect, useState } from "react";
import { refresh } from "@react-native-community/netinfo";

interface MenuProps {
  name: string;
  navigate: string;
  needInternet: boolean;
}

export default function LoggedIn({ navigation }: LoggedInProps) {
  const [isConnected, setConnected] = useState<boolean>();
  const [connectionType, setConnectionType] = useState<string>("");
  useEffect(() => {
    const x = async () => {
      const f = await refresh().then((state) => {
        setConnected(state.isConnected || false);
        setConnectionType(state.type);
      });
      return () => f;
    };
    x();
    const interval = setInterval(x, 1500);
    return () => clearInterval(interval);
  }, []);

  // INFO: This list has 3 required keys
  // name: string -> This is to name or label the button
  // navigate: string -> This is to go to the page. The page must registered in src/pages/index.tsx
  // needInternet: boolean -> This is to remove the button once the device is offline or online
  //                          This will also the key to prevent some minor issues in remember me function
  const menu: MenuProps[] = [
    {
      name: "Attend to an Event",
      navigate: "QRGenerator",
      needInternet: false,
    },
    {
      name: "Create an Event",
      navigate: "EventMaker",
      needInternet: true,
    },
    {
      name: "Take Attendance",
      navigate: "QRScanner",
      needInternet: true,
    },
    {
      name: "Send Feedback",
      navigate: "Feedback",
      needInternet: true,
    },
    {
      name: "Modify Account Info",
      navigate: "EditAccount",
      needInternet: true,
    },
  ];

  return (
    <View className="flex-1 w-full">
      <Header />
      <Card className="w-full">
        <PageHeadings
          title="Account Management"
          subtitle="Please select your action."
        />
        {/*
         * TODO: For future developers, if ever that there are buttons are not visible
         * Kindly add `flex-1` in <Card> tag and in the <View> beneath this commend
         * This is just to make it visible.
         * - RyannKim327
         */}
        <View className="w-full gap-3">
          <Text>
            {isConnected
              ? `Connection: ${connectionType.toUpperCase()}`
              : "Disconnected"}
          </Text>
          <Scroller>
            {menu.map((value: MenuProps) => {
              return (value.needInternet && isConnected) ||
                !value.needInternet ? (
                <Button
                  onclick={() => {
                    navigation.navigate(value.navigate);
                  }}
                >
                  {value.name}
                </Button>
              ) : null;
            })}
          </Scroller>
          <Button
            onclick={async () => {
              Remove("user");
              navigation.replace("Login");
            }}
          >
            Sign Out
          </Button>
        </View>
      </Card>
    </View>
  );
}
