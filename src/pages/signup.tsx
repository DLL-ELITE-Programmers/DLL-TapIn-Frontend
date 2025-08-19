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
  username: string;
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
  const [confirm, setConfirm] = useState("");
  const [signupData, setSignup] = useState<signupProps>({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    sex: 2,
    password: "",
    department_id: "BSIT",
  });

  // INFO: Department List Setup
  const [department, setDepartment] = useState<dept[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const IDRegex = /^(\d+)([a-zA-Z]){1}-(\d+)$/i;

  useEffect(() => {
    (async () => {
      const data = await GetItem("user");
      if (data.username && data.remember) {
        navigation.replace("LoggedIn");
      }

      const response = await get_unauth("department");
      setDepartment(response);
    })();
  }, []);

  const signup = async () => {
    const req: string[] = [];
    interface signKeys {
      username: string;
      first_name: string;
      middle_name?: string;
      last_name: string;
      email: string;
      sex: string;
      password: string;
      department_id: string;
    }

    const key_: signKeys = {
      username: "Student ID",
      first_name: "First Name",
      middle_name: "Middle Name",
      last_name: "Last Name",
      email: "Email Address",
      sex: "Sex",
      department_id: "Department",
      password: "Password",
    };

    // TODO: Adding requirements
    const keys: string[] = Object.keys(signupData);
    for (const key of keys) {
      const data = signupData[key as keyof signKeys];
      if (!data && key !== "middle_name") {
        const k: any = key_[key as keyof signKeys];
        req.push(k);
      }
    }

    if (!confirm) {
      req.push("Confirm Password");
    }

    if (req.length > 0) {
      const msg = `Kindly fill-up the following input: \n\n${req.join("\n")}`;
      Alert.alert("Notice", msg, [
        {
          text: "Close",
        },
      ]);
      return;
    }

    // TODO: Student ID automation formatting
    const username = signupData.username.replace(/([\W\s]+)/gi, "");
    const user = username.substring(0, 4) + "-" + username.substring(4);
    signupData.username = user;

    // TODO: Validators
    if (!IDRegex.test(signupData.username)) {
      setMessage("Please enter a valid Student ID");
      return;
    }

    if (signupData.password !== confirm) {
      setMessage("Password are not match. Parang kayo");
      return;
    }

    if (signupData.password.length < 6) {
      setMessage("Password must be atleast 6 characters long");
      return;
    }

    // TODO: Process
    const info: string[] = [];
    for (const key of keys) {
      if (key === "sex") {
        const sex = ["Female", "Male", "Others"];
        info.push(`${key_[key]}: ${sex[signupData[key]]}`);
      } else {
        info.push(
          `${key_[key as keyof signKeys]}: ${signupData[key as keyof signupProps]}`,
        );
      }
    }

    Alert.alert(
      "Confirmation",
      `Please confirm the information below:\n\n${info.join("\n")}`,
      [
        {
          text: "Confirm",
          onPress: async () => {
            setSending(true);

            const data = await post_unauth("users/register", signupData);
            if (data.error) {
              setMessage(data.error);
              setSending(false);
            }
            if (data.message) {
              setMessage(data.message);
              setTimeout(() => {
                navigation.replace("Login");
              }, 1500);
            } else {
              setMessage(
                "There's having a problem with the connection, please try again later.",
              );
              setSending(false);
            }
          },
        },
        {
          text: "Cancel",
        },
      ],
    );
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
            changeable={sending}
          />
          <Input
            hint="012A-3456"
            onchange={(text: string) => {
              setSignup({ ...signupData, username: text });
            }}
            label="Student ID"
            value={signupData.username}
            editable={!sending}
          />
          <Input
            label="First Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, first_name: text });
            }}
            value={signupData.first_name}
            editable={!sending}
          />
          <Input
            label="Middle Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, middle_name: text });
            }}
            value={signupData.middle_name}
            editable={!sending}
          />
          <Input
            label="Last Name"
            onchange={(text: string) => {
              setSignup({ ...signupData, last_name: text });
            }}
            value={signupData.last_name}
            editable={!sending}
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
            changeable={sending}
          />
          <Input
            label="Email"
            onchange={(text: string) => {
              setSignup({ ...signupData, email: text });
            }}
            value={signupData.email}
            editable={!sending}
          />
          <Input
            label="Password"
            password={true}
            onchange={(text: string) => {
              setSignup({ ...signupData, password: text });
            }}
            value={signupData.password}
            editable={!sending}
          />
          <Input
            label="Confirm Password"
            password={true}
            onchange={setConfirm}
            value={confirm}
            editable={!sending}
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
        visible={message.length > 0}
        onDismiss={() => setMessage("")}
        action={{
          label: "Close",
          onPress: () => {
            setMessage("");
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
}
