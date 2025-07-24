import React, { useRef, useEffect } from "react";
import {
  Switch,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Input from "src/widgets/input";
import Btn from "src/widgets/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";
import { useState } from "react";
import { post_unauth } from "utils/access";
import { Snackbar } from "react-native-paper";
import { SetItem } from "src/control/data";
import { LinearGradient } from 'expo-linear-gradient';

const { height: screenHeight } = Dimensions.get("window");

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: Props) {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const translateY = useRef(new Animated.Value(screenHeight * 0.4)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const login = async (navigation: LoginScreenNavigationProp) => {
    if (!studentID || !password) {
      setError("Please insert your Student ID and/or Password");
      setVisible(true);
      return;
    }
    
    try {
      const response = await post_unauth("users/login", {
        username: studentID,
        password: password,
      });
      
      if (response.error) {
        setError(response.error);
        setVisible(true);
        return;
      }
      
      if (response.message) {
        SetItem("user", response.user);
        SetItem("token", response.access);
        navigation.replace("LoggedIn");
      }
    } catch (err) {
      setError("An error occurred during login");
      setVisible(true);
    }
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: screenHeight * 0.4,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient
          colors={['transparent', '#1E40AF']}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: backdropOpacity,
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 40,
          transform: [{ translateY }],
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: "#E5E7EB",
            borderRadius: 2,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Image
            source={require("../../assets/dll_logo.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: "center", width: "100%" }}>
          <View style={{ gap: 24, width: "90%", maxWidth: 400 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                className="text-3xl font-bold mb-4"
              >
                Login
              </Text>
              <Text style={{ textAlign: "center" }}>
                Just a tap away from being counted.
              </Text>
            </View>

            <Input
              onchange={setStudentID}
              hint="012A-3456"
              label="Student ID"
              value={studentID}
            />

            <Input
              onchange={setPassword}
              value={password}
              label="Password"
              password={true}
            />

            <View className="w-full flex-row justify-between items-center -mt-4"
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Switch
                  value={rememberMe}
                  onValueChange={(val: boolean) => {
                    setRememberMe(val);
                  }}
                />
                <Text
                  onPress={() => {
                    setRememberMe((prev) => !prev);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  {rememberMe ? "Remembered" : "Remember me"}
                </Text>
              </View>
              <Text
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
                className="font-semibold text-underline color-[#1D4ED8]"
              >
                Forgot password?
              </Text>
            </View>
            
            <View style={{ justifyContent: "center", alignItems: "center", gap: 16 }}>
              <View style={{ width: "100%", marginTop: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    login(navigation);
                  }}
                  style={{
                    backgroundColor: "#1D4ED8",
                    borderWidth: 1,
                    borderColor: "#1D4ED8",
                    borderRadius: 8,
                    paddingVertical: 9,
                    paddingHorizontal: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#1D4ED8",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    className="text-white text-base font-semibold"
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#6B7280" }}>Don't have an account yet? </Text>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: "#1D4ED8",
                    fontWeight: "bold",
                  }}
                  onPress={() => {
                    navigation.replace("Signup");
                  }}
                >
                  Signup
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
    </LinearGradient>
  );
}