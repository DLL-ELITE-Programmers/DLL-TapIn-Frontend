import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Card from "src/component/card";
import Header from "src/component/header";
import PageHeadings from "src/component/page_heading";
import { GetItem, SetItem } from "src/control/data";
import { TermsProps } from "src/interfaces/navigation_props";
import { get_unauth } from "utils/access";

interface termsProps {
  intro: string;
  sub: any;
}

export default function Terms({ navigation }: TermsProps) {
  const [terms, setTerms] = useState<termsProps>({
    intro: "Intro",
    sub: {},
  });

  useEffect(() => {
    (async () => {
      const response = await get_unauth("terms");
      if (response.message) {
        setTerms(response.terms);
        SetItem("terms", response.terms);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await GetItem("terms");
      setTerms(data);
    })();
  }, []);

  return (
    <View className="flex-1 w-full gap-2">
      <Header />
      <Card>
        <PageHeadings title="Terms and Conditions" />
        <Text className="text-justify">{terms.intro}</Text>
        {Object.keys(terms.sub).map((sub: string) => {
          const obj = terms.sub;
          return (
            <View className="flex flex-row">
              <Text className="text-justify">
                <Text className="font-bold">{sub}: </Text>
                {obj[sub]}
              </Text>
            </View>
          );
        })}
      </Card>
    </View>
  );
}
