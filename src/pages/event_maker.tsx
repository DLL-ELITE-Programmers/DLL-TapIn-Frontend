import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Title from "src/component/title";
import Btn from "src/widgets/button";
import Spinner from "src/widgets/dropdown";
import Input from "src/widgets/input";
import Scroller from "src/component/scroller";
import { dept, RootStackParamList } from "types";
import { get_unauth } from "utils/access";
import Card from "src/component/card";

type EventMakerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventMaker"
>;

interface Props {
  navigation: EventMakerScreenNavigationProp;
}

export default function EventMaker({ navigation }: Props) {
  // INFO: Initiation of data
  const [department, setDepartment] = useState("");

  // INFO: Syncronized data
  const [departmentList, setDepartmentList] = useState<dept[]>([]);

  useEffect(() => {
    (async () => {
      const response = await get_unauth("department");
      setDepartmentList(response);
    })();
  }, []);

  return (
    <View className="flex-1 w-full gap-2 p-4">
      <Title />
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
              data={departmentList}
              valueField="department_id"
              labelField="department_name"
              label="Department"
              onchange={(e: dept) => {
                setDepartment(e.department_id);
              }}
            />
            <Input label="Event name" />
            <Btn>Add event</Btn>
          </View>
        </Scroller>
      </Card>
    </View>
  );
}
