import { View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import Scroller from "src/component/scroller";
import { FeedbackProps } from "src/interfaces/navigation_props";
import Btn from "src/widgets/button";
import Input from "src/widgets/input";


export default function Feedback({ navigation }: FeedbackProps) {
	return (
		<View className="flex-1">
			<Header />
			<Card>
				<PageHeadings title="Feedback" subtitle="Send us your experience with the application." />
				<Scroller className="flex-1">
					<Input label="Feedback Title" />
					<Input label="Feedback message" multiline={true} />
					<Btn>Send feedback</Btn>
				</Scroller>
			</Card>
		</View>
	)
}
