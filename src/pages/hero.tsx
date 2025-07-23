import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from "types";

type HeroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Hero"
>;

interface Props {
  navigation: HeroScreenNavigationProp;
}

export default function Hero({ navigation }: Props) {
  return (
    <LinearGradient
      colors={['transparent', '#1E40AF']}
      start={{ x: 0, y: 0 }} 
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="flex flex-col w-full flex-1 p-4 items-center justify-end gap-4 mb-10 pb-6">
        <View className="flex justify-end w-full items-center">
          <View className="w-2/5 aspect-square">
            <Image
              className="w-full h-full"
              source={require("../../assets/dll_logo.png")}
            />
          </View>
        
          <View className="w-full items-center mt-8">
            <Text className="font-semibold text-5xl text-white">DLL - TapIn</Text>
            <Text className="mt-2 text-white">Automated Attendance System</Text>
          </View>
          <View style={{ width: '80%', marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                backgroundColor: '#fff',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 25,
                alignItems: 'center',
              }}
            >
              <Text className="text-base font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center mt-4">
              <Text className="text-white">Don't have an account? </Text>
            <Text
              onPress={() => {
                navigation.navigate("Signup");
              }}
              className="underline font-bold text-white"
            >
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}