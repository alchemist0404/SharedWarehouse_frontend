import { ILocationDto } from '@screens/NeedsDashboard/Account/model/Location';

export interface IProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  repeatPassword: string;
  companyName: string;
  avatar?: string;
  location: ILocationDto;
}
