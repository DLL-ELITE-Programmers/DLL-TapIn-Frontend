import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-qr-code";
import Header from "src/component/header";
import { GetItem } from "src/control/data";
import Card from "src/component/card";
import { UserProps } from "types";
import { QRGeneratorProps } from "src/interfaces/navigation_props";
import PageHeadings from "src/component/page_heading";

export default function QRGenerator({ navigation }: QRGeneratorProps) {
  const [token, setToken] = useState("");
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
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

      const dataToken = await GetItem("token");
      setToken(dataToken);
    })();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentTime(new Date().getTime());
    }, 10000);
    return () => clearTimeout(t);
  }, [currentTime]);

  return (
    <View className="flex-1 items-center">
      <Header />
      <View className="flex-1 w-full justify-center items-center p-4">
        <Card className="gap-4">
          <PageHeadings
            title="User Information"
            subtitle="Please let the organizer scan this QR Code for your attendance."
          />
          <QRCode
            size={256}
            value={JSON.stringify({
              user: user.username,
              time: currentTime,
            })}
            viewBox={"0 0 256 256"}
          />
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
