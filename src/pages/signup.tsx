import { Text, View } from "react-native";
import Input from "../widgets/input";
import Btn from "../widgets/button";
import Spinner from "../widgets/dropdown";
import { useEffect, useState } from "react";
import { get_unauth, post_unauth } from "../../utils/access";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Title from "src/component/title";
import { Snackbar } from "react-native-paper";

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
  const [confirm, setConfirm] = useState("");
  const [departmentValue, setDepartmentValue] = useState("BSIT");

  // INFO: Department List Setup
  const [department, setDepartment] = useState<dept[]>([
    {
      department_name: "Test",
      department_id: "HIHI",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

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

  const signup = async () => {
    if (password !== confirm) {
      setError("Password are not match. Parang kayo");
      setVisible(true);
    }

    const data = await post_unauth("users/register", {
      student_id: studentID,
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      email: email,
      password: password,
      department_id: departmentValue,
    });
    if (data.error) {
      setError(data.error);
      setVisible(true);
    }
    if (data.message) {
      setError(data.message);
      setVisible(true);
    }
  };
  return (
    <View className="flex flex-col flex-1 gap-4 bg-transparent items-center p-4">
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
        <Input hint="012A-3456" onchange={setStudentID} label="Student ID" />
        <Input label="First Name" onchange={setFirstname} />
        <Input label="Middle Name" onchange={setMiddleName} />
        <Input label="Last Name" onchange={setLastname} />
        <Input label="Email" onchange={setEmail} />
        <Input label="Password" password={true} onchange={setPassword} />
        <Input label="Confirm Password" password={true} onchange={setConfirm} />
        <View className="w-full mt-4">
          <Btn onclick={signup}>Signup</Btn>
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
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
