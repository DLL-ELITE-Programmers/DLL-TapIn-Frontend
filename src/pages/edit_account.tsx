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
import { get_unauth } from "utils/access";
import Button from "src/widgets/button";

export default function EditAccount({ navigation }: EditAccountProps) {
  const [department, setDepartment] = useState<dept[]>([]);
  const [self, setSelf] = useState<UserCredsOffline>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_superuser: false,
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

  return (
    <View className="flex-1">
      <Header />
      <Card>
        <PageHeadings
          title="Edit Account"
          subtitle="Modify your account information here"
        />
        <Scroller>
          <Spinner
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
            label="First Name"
            value={self.first_name}
            onchange={(e) => {
              setSelf({ ...self, first_name: e });
            }}
          />
          <Input
            label="Middle Name"
            value={self.middle_name ?? ""}
            onchange={(e) => {
              setSelf({ ...self, middle_name: e });
            }}
          />
          <Input
            label="Last Name"
            value={self.last_name}
            onchange={(e) => {
              setSelf({ ...self, last_name: e });
            }}
          />
          <Input
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
        </Scroller>
        <Button>Save</Button>
      </Card>
    </View>
  );
}
