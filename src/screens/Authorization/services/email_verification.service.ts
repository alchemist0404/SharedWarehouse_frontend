import { callApi } from '@helpers/api.helper';
import { IEmailActivationData } from '@screens/Authorization/models/EmailActivationData';

export const resendEmail = async () => {
  await callApi({
    endpoint: '/api/auth/verify_email',
    method: 'GET'
  });
};

export const verifyEmailActivation = async (data: IEmailActivationData) => {
  await callApi({
    endpoint: '/api/auth/verify_email',
    method: 'POST',
    requestData: data
  });
};
