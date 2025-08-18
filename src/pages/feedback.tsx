import { useState } from "react";
import { View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import Scroller from "src/component/scroller";
import { FeedbackProps } from "src/interfaces/navigation_props";
import Button from "src/widgets/button";
import Input from "src/widgets/input";
import { FeedbackInterface } from "types";

export default function Feedback({ navigation }: FeedbackProps) {
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState("")
  const [feedback, setFeedback] = useState<FeedbackInterface>({
    title: "",
    message: ""
  })

  const submit = async () => {
    setSending(true)

  };

  return (
    <View className="flex-1">
      <Header />
      <Card>
        <PageHeadings
          title="Feedback"
          subtitle="Send us your experience with the application."
        />
        <Scroller className="flex-1">
          <Input
            editable={!sending}
            label="Feedback Title" onchange={(text: string) => {
              setFeedback({ ...feedback, title: text })
            }} />
          <Input
            editable={!sending}
            label="Feedback message"
            multiline={true}
            onchange={(text: string) => {
              setFeedback({ ...feedback, message: text })
            }}
          />
          <Button loading={sending} onclick={submit}>Send feedback</Button>
        </Scroller>
      </Card>
    </View >
  );
}
