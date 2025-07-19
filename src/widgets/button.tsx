import { ReactNode } from "react";
import { Button, View } from "react-native";

interface button {
  children: string;
  onclick?: () => void;
}
export default function Btn(props: button) {
  return (
    <Button
      className="w-full bg-blue-500 rounded-md"
      onPress={props.onclick}
      title={props.children}
    />
  );
}
