export interface UserCredsOffline {
  username: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  sex: number;
  department: string;
  remember?: boolean;
  password?: string;
  confirm?: string;
}

export interface UserProps {
  username: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  sex: number;
  is_superuser?: boolean;
  department_info?: {
    id: number;
    department_id: string;
    department_name: string;
  };
  remember?: boolean;
  password?: string;
  confirm?: string;
}

export interface FeedbackInterface {
  title: string;
  message: string;
}

export interface event_interface {
  event_id: string;
  event_name: string;
  event_description: string;
  event_venue: string;
  organization: number[] | number;
}

export interface org {
  organization_id: string;
  organization_name: string;
}

export interface dept {
  department_id: string;
  department_name: string;
}
