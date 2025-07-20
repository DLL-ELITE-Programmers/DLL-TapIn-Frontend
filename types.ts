export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  QRGenerator: undefined;
  ForgotPassword: undefined;
  Hero: undefined;
};

export interface UserProps {
  username: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
}
