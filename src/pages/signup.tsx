import { Alert, Text, View } from "react-native";
import Input from "src/widgets/input";
import Btn from "src/widgets/button";
import Spinner from "src/widgets/dropdown";
import { useEffect, useState } from "react";
import { get_unauth, post_unauth } from "utils/access";
import Scroller from "src/component/scroller";
import Card from "src/component/card";
import { SignupProps } from "src/interfaces/navigation_props";
import Title from "src/component/title";
import { Snackbar } from "react-native-paper";
import { dept } from "types";

interface six {
  index: number;
  sex: string;
}

export default function SignUp({ navigation }: SignupProps) {
  // INFO: Data handle setup
  const [studentID, setStudentID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [sex, setSex] = useState(0);
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
  const [sending, setSending] = useState(false);

  const IDRegex = /^(\d+)([a-zA-Z]){1}-(\d+)$/i;

  useEffect(() => {
    (async () => {
      const response = await get_unauth("department");
      setDepartment(response);
    })();
  }, []);

  const signup = async () => {
    const req = [];

    // TODO: Adding requirements
    if (!studentID) {
      req.push("Student ID");
    }
    if (!firstname) {
      req.push("First name");
    }
    if (!lastname) {
      req.push("Last name");
    }
    if (!email) {
      req.push("Email");
    }
    if (!password) {
      req.push("Password");
    }
    if (!confirm) {
      req.push("Confirm Password");
    }

    if (req.length > 0) {
      const msg = `Kindly fill-up the following input: \n\n${req.join("\n")}`;
      // setAlertVisible(true)
      Alert.alert("Notice", msg, [
        {
          text: "Close",
        },
      ]);
      return;
    }

    // TODO: Validators
    if (!IDRegex.test(studentID)) {
      setError("Please enter a valid Student ID");
      setVisible(true);
      return;
    }

    if (password !== confirm) {
      setError("Password are not match. Parang kayo");
      setVisible(true);
      return;
    }

    if (password.length < 6) {
      setError("Password must be atleast 6 characters long");
      setVisible(true);
      return;
    }

    // TODO: Process
    setSending(true);

    const data = await post_unauth("users/register", {
      student_id: studentID,
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      email: email,
      sex: sex,
      password: password,
      department_id: departmentValue,
    });
    if (data.error) {
      setError(data.error);
      setVisible(true);
      setSending(false);
    }
    if (data.message) {
      setError(data.message);
      setVisible(true);
      setTimeout(() => {
        navigation.replace("Login");
      }, 1500);
    }
  };

  return (
    <View className="flex flex-col flex-1 gap-4 bg-transparent items-center">
      <Title />
      <Card className="flex-1">
        <Text
          style={{
            fontFamily: "LeagueGothic",
          }}
          className="text-3xl"
        >
          Sign Up
        </Text>
        <View className="pt-4 flex flex-row text-center items-center justify-center">
          <Text>Do you have an account now? </Text>
          <Text
            className="underline text-blue-700 font-bold"
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </View>
        <Scroller>
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
          <Spinner
            onchange={(e: six) => {
              setSex(e.index);
            }}
            value={sex}
            data={[
              {
                index: 0,
                sex: "Female",
              },
              {
                index: 1,
                sex: "Male",
              },
              {
                index: 2,
                sex: "Others",
              },
            ]}
            valueField="index"
            labelField="sex"
            label="Sex"
          />
          <Input label="Email" onchange={setEmail} />
          <Input label="Password" password={true} onchange={setPassword} />
          <Input
            label="Confirm Password"
            password={true}
            onchange={setConfirm}
          />
        </Scroller>
        <View className="w-full mt-4">
          <Btn onclick={signup} loading={sending}>
            Signup
          </Btn>
        </View>

        <View className="w-full mt-2">
          <Text>
            By signing up with this application, you agee with our{" "}
            <Text
              className="text-blue-700 underline font-bold"
              onPress={() => {
                navigation.navigate("Terms");
              }}
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>
      </Card>

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
