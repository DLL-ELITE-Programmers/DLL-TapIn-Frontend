import { View } from "react-native";
import Button from "src/widgets/button";
import Scroller from "src/component/scroller";
import Card from "src/component/card";
import Header from "src/component/header";
import { LoggedInProps } from "src/interfaces/navigation_props";
import PageHeadings from "src/component/page_heading";
import { Remove } from "src/control/data";

export default function LoggedIn({ navigation }: LoggedInProps) {
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
          <Scroller>
            <Button
              onclick={() => {
                navigation.navigate("QRGenerator");
              }}
            >
              Attend to an event
            </Button>
            <Button
              onclick={() => {
                navigation.navigate("EventMaker");
              }}
            >
              Create an Event
            </Button>
            <Button
              onclick={() => {
                navigation.navigate("QRScanner");
              }}
            >
              Take in attendance
            </Button>
            <Button
              onclick={() => {
                navigation.navigate("Feedback");
              }}
            >
              Send Feedback
            </Button>
            <Button onclick={() => {
              navigation.navigate("EditAccount")
            }}>Modify Account</Button>
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
