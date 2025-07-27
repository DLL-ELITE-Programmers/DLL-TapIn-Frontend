export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  QRGenerator: undefined;
  ForgotPassword: undefined;
  Hero: undefined;
  Splash: undefined;
  QRScanner: undefined;
  EventMaker: undefined;
  LoggedIn: undefined;
};

export interface UserProps {
  username: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
  department_info?: {
    id: number;
    department_id: string;
    department_name: string;
  };
}

export interface event_interface {
  event_id: string;
  event_name: string;
  event_description: string;
  event_venue: string;
  organization: number[];
}

export interface org {
  organization_id: string;
  organization_name: string;
}

export interface dept {
  department_id: string;
  department_name: string;
}
