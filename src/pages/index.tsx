// import { Text, View } from "react-native";
import { View } from "react-native";
import Login from "./login";
import SignUp from "./signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../component/header";

const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <View className="flex-1 w-full h-full">
      <Header />
      {/* TODO: To manage all things we need to manage in. */}
      {/* //   <Login /> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
