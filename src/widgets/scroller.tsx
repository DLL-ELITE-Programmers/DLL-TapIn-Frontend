import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

interface Props {
    children: ReactNode,
    className?: string
}

export default function Scroller(props: Props){
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            className="w-full">
            <View className={`gap-2 w-full px-10 bg-white shadow-black shadow-md items-center justify-center p-4 rounded-md ${props.className ?? ""}`}>
                {props.children}
            </View>
        </ScrollView>
    )
}