import { Switch, Text, View } from "react-native";
import Input from "../widgets/input";
import Btn from "../widgets/button";
import Spinner from "../widgets/dropdown";
import { useEffect, useState } from "react";
import { get_unauth } from "../../utils/access";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

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

  return (
    <View className="flex flex-col flex-1 justify-center bg-transparent items-center p-4">
      <View className="gap-2 w-full px-10 bg-slate-200 items-center justify-center p-4 rounded-md">
        <Text className="text-3xl font-bold">Sign Up</Text>
        <View className="flex flex-row">
          <Text>Do you have an account now? </Text>
          <Text
            className="underline"
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </View>
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
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center">
            <Switch value={false} />
            <Text>Remember me</Text>
          </View>
        </View>
        <Btn>Signup</Btn>
      </View>
    </View>
  );
}
