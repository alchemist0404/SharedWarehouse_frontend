import { callApi } from '@helpers/api.helper';
import { ILoginData } from '@screens/Authorization/models/LoginData';
import { removeTokens } from '@screens/Authorization/services/tokens.service';
import { IRegistrationData } from '@screens/Authorization/models/RegistrationData';

export const login = async (data: ILoginData) => callApi({
  endpoint: '/api/auth/login',
  requestData: data,
  method: 'POST'
});

export const userInfo = async () => callApi({
  endpoint: '/api/user/info',
  method: 'GET'
});

export const refresh = async (refreshToken: string) => callApi({
  endpoint: '/api/auth/refresh',
  method: 'POST',
  requestData: {
    refreshToken
  }
});

export const logout = async () => {
  removeTokens();
};

export const register = async (data: IRegistrationData) => callApi({
  endpoint: '/api/auth/register',
  method: 'POST',
  requestData: data
});
