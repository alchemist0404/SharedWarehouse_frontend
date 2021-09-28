import { callApi } from '@helpers/api.helper';

export const bookSpaces = async requestData => callApi({
  endpoint: 'booking',
  method: 'PUT',
  requestData
});
