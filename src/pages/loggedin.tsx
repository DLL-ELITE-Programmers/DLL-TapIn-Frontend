import { View } from "react-native";
import Button from "src/widgets/button";
import Scroller from "src/component/scroller";
import Card from "src/component/card";
import Header from "src/component/header";
import { IconButton } from "react-native-paper";
import { Remove } from "src/control/data";
import { LoggedInProps } from "src/interfaces/navigation_props";
import PageHeadings from "src/component/page_heading";

export default function LoggedIn({ navigation }: LoggedInProps) {
  return (
    <View className="flex-1 w-full">
      <Header>
        <IconButton
          onPress={async () => {
            Remove("user");
            navigation.replace("Login");
          }}
          icon={require("../../assets/logout.png")}
          className="w-[25px] h-[25px]"
        />
      </Header>
      <Card>
        <PageHeadings
          title="Account Management"
          subtitle="Please select your action."
        />
        <Scroller>
          <View className="w-full gap-2">
            <Button
              onclick={() => {
                navigation.navigate("QRGenerator");
              }}
            >
              Attend to an event
            </Button>
            {/* <Button */}
            {/*   onclick={() => { */}
            {/*     navigation.navigate("EventMaker"); */}
            {/*   }} */}
            {/* > */}
            {/*   Create an Event */}
            {/* </Button> */}
            <Button
              onclick={() => {
                navigation.navigate("QRScanner");
              }}
            >
              Take in attendance
            </Button>
            <Button
              onclick={() => {
                navigation.replace("Feedback");
              }}
            >
              Send Feedback
            </Button>
          </View>
        </Scroller>
      </Card>
    </View>
  );
}
