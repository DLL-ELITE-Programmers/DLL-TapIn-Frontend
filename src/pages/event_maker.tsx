import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Button from "src/widgets/button";
import Spinner from "src/widgets/dropdown";
import Input from "src/widgets/input";
import Scroller from "src/component/scroller";
import { dept, org } from "types";
import { get_unauth, post } from "utils/access";
import Card from "src/component/card";
import Header from "src/component/header";
import { EventMakerProps } from "src/interfaces/navigation_props";
import PageHeadings from "src/component/page_heading";

export default function EventMaker({ navigation }: EventMakerProps) {
  // INFO: Initiation of data
  const [eventData, setEventData] = useState({
    event_name: "",
    event_desciption: "",
    organization: "DLL-OSAS",
    event_venue: "",
  });

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // INFO: Syncronized data
  const [organizations, setOrganizations] = useState<org[]>([
    {
      deparment: [],
      id: -1,
      organization_id: "Loading",
      organization_name: "Please Wait",
    },
  ]);

  useEffect(() => {
    (async () => {
      const response = await get_unauth("organization");
      setOrganizations(response);
    })();
  }, []);

  const submitEvent = async () => {
    setSending(true);
    const response = await post("events", eventData);
    if (response.error) {
      setMessage(response.error);
      setSending(false);
    } else if (response.message) {
      Alert.alert(
        "Event Created successfully",
        `Please take note at this:\nYour event code is: ${response.event_information.event_id}. Please don't share the code to the unauthorized students and commitee.`,
        [
          {
            text: "Close",
          },
        ],
        {
          cancelable: false,
        },
      );
      setSending(false);
    } else {
      setMessage("There's a problem within the system");
      setSending(false);
    }
  };

  return (
    <View className="flex-1 w-full gap-2">
      <Header />
      <Card className="gap-4">
        <PageHeadings
          title="Event Maker"
          subtitle="Create an event for your organization"
        />
        <Scroller>
          <View className="w-full gap-2">
            <Spinner
              data={organizations}
              valueField="organization_id"
              labelField="organization_name"
              label="Organization"
              onchange={(e: org) => {
                setEventData({ ...eventData, organization: e.organization_id });
              }}
              changeable={!sending}
            />
            <Input
              label="Event name"
              onchange={(text: string) => {
                setEventData({ ...eventData, event_name: text });
              }}
              editable={!sending}
            />
            <Input
              multiline={true}
              label="Event Description"
              onchange={(text: string) => {
                setEventData({ ...eventData, event_desciption: text });
              }}
              editable={!sending}
            />
            <Input
              label="Event Venue"
              onchange={(text: string) => {
                setEventData({ ...eventData, event_venue: text });
              }}
              editable={!sending}
            />
            {/* <Input */}
            {/*   password={true} */}
            {/*   label="Event Admin Code" */}
            {/*   hint="Any passphrase related to the event which may give to the coordinators" */}
            {/* /> */}
            {/* <Input label="Time in" type="dateTime" /> */}
            {/* <Input label="Time out" type="dateTime" /> */}
            <Button loading={sending} onclick={submitEvent}>
              Add event
            </Button>
          </View>
        </Scroller>
      </Card>
    </View>
  );
}
