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

export interface org {
  organization_id: string;
  organization_name: string;
}

export interface dept {
  department_id: string;
  department_name: string;
}
