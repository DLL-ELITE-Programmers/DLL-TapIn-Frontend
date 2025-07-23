import { ReactNode } from "react";
import { ScrollView } from "react-native";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function Scroller(props: Props) {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            className="w-full"
        >
            {props.children}
        </ScrollView>
    );
}
