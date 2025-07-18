// import { Text, View } from "react-native";
import { View } from "react-native";
import Login from "./login";
import SignUp from "./signup";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function Page() {
  return (
    <View className="bg-[#f00] flex-1 w-full h-full">
    {/* TODO: To manage all things we need to manage in. */}
    {/* //   <Login /> */}
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={ Login } />
          <Stack.Screen name="Signup" component={ SignUp } />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
