import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Login from "./login";
import SignUp from "./signup";
import QRGenerator from "./qr_generate";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import ForgotPassword from "./forgot_password";
import Hero from "./hero";
import Splash from "./splash";
import QRScanner from "./qr_scanner";
import EventMaker from "./event_maker";
import LoggedIn from "./loggedin";

const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      className="flex-1 w-full h-full"
    >
      {/* TODO: To manage all things we need to manage in. */}

      <LinearGradient
        colors={[
          "#ffff0090",
          "#ffffff90",
          "#ffffff90",
          "#ffffff90",
          "#ffffff90",
          "#aaedff90",
          "#aaedff90",
        ]}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "transparent",
                  },
                }}
                initialRouteName="Splash"
              >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Hero" component={Hero} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={SignUp} />
                <Stack.Screen name="QRGenerator" component={QRGenerator} />
                <Stack.Screen name="QRScanner" component={QRScanner} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="EventMaker" component={EventMaker} />
                <Stack.Screen name="LoggedIn" component={LoggedIn} />
              </Stack.Navigator>
            </NavigationContainer>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}
