/*
 * NOTE: This file witll help to organize the interfaces for each pages
 * related to navigation
 *
 * INFO:
 * File created by: Ryann Kim Sesgundo
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  QRGenerator: undefined;
  ForgotPassword: undefined;
  Hero: undefined;
  Splash: undefined;
  QRScanner: undefined;
  EventMaker: undefined;
  LoggedIn: undefined;
  Terms: undefined;
};

export interface EventMakerProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "EventMaker">;
}

export interface ForgotPasswordProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "ForgotPassword">;
}

export interface HeroProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Hero">;
}

export interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

export interface LoggedInProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "LoggedIn">;
}

export interface QRGeneratorProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "QRGenerator">;
}

export interface QRScannerProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "QRScanner">;
}

export interface SignupProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
}

export interface SplashProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
}

export interface TermsProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Terms">;
}
