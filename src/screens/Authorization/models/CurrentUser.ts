import { Role } from '@screens/Authorization/models/Roles';

export interface ICurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  roles: Role[];
  emailVerified: boolean;
}
