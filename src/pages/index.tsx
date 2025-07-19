// import { Text, View } from "react-native";
import { ImageBackground, View } from "react-native";
import Login from "./login";
import SignUp from "./signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../component/header";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      className="flex-1 w-full h-full"
    >
      <Header />
      {/* TODO: To manage all things we need to manage in. */}
      {/* //   <Login /> */}
      <LinearGradient
        colors={["#ffff9050", "#ffffff10", "#ffff0010", "#aadeff90"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        className="flex-1 w-full h-full"
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </ImageBackground>
  );
}
