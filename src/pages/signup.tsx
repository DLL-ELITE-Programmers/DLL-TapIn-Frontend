import { Alert, Text, View } from "react-native";
import Input from "src/widgets/input";
import Button from "src/widgets/button";
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

interface signupProps {
  studentID: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  sex: number;
  password: string;
  department_id: string;
}

export default function SignUp({ navigation }: SignupProps) {
  // INFO: Data handle setup
  const [confirm, setConfirm] = useState("")
  const [signupData, setSignup] = useState<signupProps>({
    studentID: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    sex: 2,
    password: "",
    department_id: "BSIT",
  });

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
    interface signKeys {
      studentID: string;
      first_name: string;
      middle_name?: string;
      last_name: string;
      email: string;
      sex: string;
      password: string;
      department_id: string;
    }

    const key_: signKeys = {
      studentID: "Student ID",
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email Address",
      sex: "Sex",
      department_id: "Department",
      password: "Password"
    };

    // TODO: Adding requirements
    const keys = Object.keys(signupData);
    for (const key of keys) {
      const data = signupData[key];
      if (!data && key !== "middle_name") {
        req.push(key_[key]);
      }
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
    if (!IDRegex.test(signupData.studentID)) {
      setError("Please enter a valid Student ID");
      setVisible(true);
      return;
    }

    if (signupData.password !== confirm) {
      setError("Password are not match. Parang kayo");
      setVisible(true);
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be atleast 6 characters long");
      setVisible(true);
      return;
    }

    // TODO: Process
    setSending(true);

    const data = await post_unauth("users/register", signupData);
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
              setSignup({ ...signupData, department_id: e.department_id });
            }}
            value={signupData.department_id}
            data={department}
            valueField="department_id"
            labelField="department_name"
            label="Department"
          />
          <Input
            hint="012A-3456"
            onchange={(text: string) => {
              setSignup({ ...signupData, studentID: text });
            }}
            label="Student ID"
          />
          <Input
            label="First Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, first_name: text });
            }}
          />
          <Input
            label="Middle Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, middle_name: text });
            }}
          />
          <Input
            label="Last Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, last_name: text });
            }}
          />
          <Spinner
            onchange={(e: six) => {
              setSignup({ ...signupData, sex: e.index });
            }}
            value={signupData.sex}
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
          <Input
            label="Email"
            onchange={(text: string) => {
              setSignup({ ...signupData, email: text });
            }}
          />
          <Input
            label="Password"
            password={true}
            onchange={(text: string) => {
              setSignup({ ...signupData, password: text });
            }}
          />
          <Input
            label="Confirm Password"
            password={true}
            onchange={setConfirm}
          />
        </Scroller>
        <View className="w-full mt-4">
          <Button onclick={signup} loading={sending}>
            Signup
          </Button>
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
