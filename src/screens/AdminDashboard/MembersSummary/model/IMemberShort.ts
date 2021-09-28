import { Role } from '@screens/Authorization/models/Roles';

export interface IMemberShort {
  avatar: string;
  id: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  email: string;
}
