import { Switch, Text, View } from "react-native";
import Input from "../widgets/input";
import Btn from "../widgets/button";
import Spinner from "../widgets/dropdown";
import { useEffect, useState } from "react";
import { get_unauth } from "../../utils/access";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import * as Font from "expo-font";
import Title from "src/component/title";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

interface dept {
  department_id: string;
  department_name: string;
}

export default function SignUp({ navigation }: Props) {
  // INFO: Data handle setup
  const [studentID, setStudentID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setCOnfirm] = useState("");
  const [departmentValue, setDepartmentValue] = useState("BSIT");

  // INFO: Department List Setup
  const [department, setDepartment] = useState<dept[]>([
    {
      department_name: "Test",
      department_id: "HIHI",
    },
  ]);

  useEffect(() => {
    (async () => {
      const response = await get_unauth("department");
      setDepartment(response);
    })();
  }, []);

  // INFO: Font setup
  // Font.loadAsync({
  //   "LeagueGothic": require("../../assets/fonts/League_Gothic/LeagueGothic-Regular-VariableFont_wdth.ttf")
  // })

  return (
    <View className="flex flex-col flex-1 justify-center bg-transparent items-center p-4">
      <Title />
      <View className="gap-2 w-full px-10 bg-white shadow-black shadow-md items-center justify-center p-4 rounded-md">
        <Text
          style={{
            fontFamily: "LeagueGothic",
          }}
          className="text-3xl"
        >
          Sign Up
        </Text>
        <Spinner
          onchange={(e: dept) => {
            setDepartmentValue(e.department_id);
          }}
          value={departmentValue}
          data={department}
          valueField="department_id"
          labelField="department_name"
          label="Department"
        />
        <Input hint="012A-3456" label="Student ID" />
        <Input label="First Name" />
        <Input label="Middle Name" />
        <Input label="Last Name" />
        <Input label="Email" />
        <Input label="Password" password={true} />
        <Input label="Confirm Password" password={true} />
        <View className="w-full mt-4">
          <Btn>Signup</Btn>
        </View>
        <View className="flex flex-row">
          <Text>Do you have an account now? </Text>
          <Text
            className="underline"
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
