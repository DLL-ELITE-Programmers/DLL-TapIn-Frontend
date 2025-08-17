import { useEffect, useState } from "react";
import { View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import Scroller from "src/component/scroller";
import { GetItem } from "src/control/data";
import { EditAccountProps } from "src/interfaces/navigation_props";
import Input from "src/widgets/input";
import { UserCredsOffline, dept } from "types";
import Spinner from "src/widgets/dropdown";
import { get_unauth, put } from "utils/access";
import Button from "src/widgets/button";
import { Snackbar } from "react-native-paper";

export default function EditAccount({ navigation }: EditAccountProps) {
  const [department, setDepartment] = useState<dept[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [self, setSelf] = useState<UserCredsOffline>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    (async () => {
      const depts = await get_unauth("department");
      setDepartment(depts);

      const data = await GetItem("user");
      console.log(data);
      setSelf(data);
    })();
  }, []);

  const sendRequest = async () => {
    setSending(true);
    const response = await put("user", self);
    if (response?.message !== undefined) {
      setMessage(response.message);
      setSending(false);
    } else {
      setMessage(
        response?.error ??
          "Sorry, but you might have internet problem or server error.",
      );
      setSending(false);
    }
  };

  return (
    <View className="flex-1">
      <Header />
      <Card className="flex-1">
        <PageHeadings
          title="Edit Account"
          subtitle="Modify your account information here"
        />
        <Scroller>
          <Spinner
            changeable={false}
            onchange={(e: dept) => {
              setSelf({ ...self, department: e.department_id });
            }}
            value={self.department ?? "BSIT"}
            data={department}
            valueField="department_id"
            labelField="department_name"
            label="Department"
          />
          <Input
            label="Student ID"
            editable={false}
            value={self.username}
            hint="012A-3456"
          />
          <Input
            editable={!sending}
            label="First Name"
            value={self.first_name}
            onchange={(e) => {
              setSelf({ ...self, first_name: e });
            }}
          />
          <Input
            editable={!sending}
            label="Middle Name"
            value={self.middle_name ?? ""}
            onchange={(e) => {
              setSelf({ ...self, middle_name: e });
            }}
          />
          <Input
            editable={!sending}
            label="Last Name"
            value={self.last_name}
            onchange={(e) => {
              setSelf({ ...self, last_name: e });
            }}
          />
          <Input
            editable={!sending}
            label="Email"
            value={self.email}
            onchange={(e) => {
              setSelf({ ...self, email: e });
            }}
          />
          <Spinner
            onchange={(v) => {
              setSelf({ ...self, sex: v.index });
            }}
            changeable={!sending}
            value={self.sex}
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
            editable={!sending}
            value={self.password}
            label="Password"
            onchange={(text: string) => {
              setSelf({ ...self, password: text });
            }}
            password={true}
          />
          <Input
            editable={!sending}
            value={self.confirm}
            password={true}
            label="Confirm Password"
            onchange={(text: string) => {
              setSelf({ ...self, confirm: text });
            }}
          />
        </Scroller>
        <Button loading={sending} onclick={sendRequest}>
          Save
        </Button>
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
