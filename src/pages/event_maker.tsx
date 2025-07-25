import { Text, View } from "react-native";
import Btn from "src/widgets/button";
import Spinner from "src/widgets/dropdown";
import Input from "src/widgets/input";
import Scroller from "src/component/scroller";
import { get_unauth } from "utils/access";
import Card from "src/component/card";
import Header from "src/component/header";
import { EventMakerProps } from "src/interfaces/navigation_props";
import { org } from "types";
import { useEffect, useState } from "react";

export default function EventMaker({ navigation }: EventMakerProps) {
  // INFO: Initiation of data
  const [organization, setOrganization] = useState("");

  // INFO: Syncronized data
  const [orgList, setOrgList] = useState(())<org[]>([]);

  useEffect(() => {
    (async () => {
      const response = await get_unauth("organization");
      setOrgList(response);
    })();
  }, []);

  return (
    <View className="flex-1 w-full gap-2">
      <Header />
      <Card className="gap-4">
        <View className="w-full items-center justify-center">
          <Text
            style={{
              fontFamily: "LeagueGothic",
            }}
            className="text-3xl"
          >
            Event Maker
          </Text>
          <Text>Create an event for your department</Text>
        </View>
        <Scroller>
          <View className="w-full gap-2">
            <Spinner
              data={orgList}
              valueField="organization_id"
              labelField="organization_name"
              label="Organization"
              onchange={(e: dept) => {
                setOrganization(e.organization_id);
              }}
            />
            <Input label="Event name" />
            <Input label="Event Description" />
            <Input label="Event Venue" />
            <Input
              password={true}
              label="Event Admin Code"
              hint="Any passphrase related to the event which may give to the coordinators"
            />
            <Input label="Time in" type="dateTime" />
            <Input label="Time out" type="dateTime" />
            <Btn>Add event</Btn>
          </View>
        </Scroller>
      </Card>
    </View>
  );
}
