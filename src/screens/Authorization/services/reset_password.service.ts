import { callApi } from '@helpers/api.helper';
import { IResetPasswordData } from '@screens/Authorization/models/ResetPasswordVerificationData';

export const sendResetPasswordMail = async (email: string) => callApi({
  endpoint: '/api/auth/reset_password',
  method: 'GET',
  queryParams: { email }
});

export const resetPassword = async (data: IResetPasswordData) => callApi({
  endpoint: '/api/auth/reset_password',
  method: 'PUT',
  requestData: data
});
