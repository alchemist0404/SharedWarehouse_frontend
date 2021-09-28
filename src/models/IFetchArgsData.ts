export interface IFetchArgsData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  requestData?: object | string;
  queryParams?: {};
  formData?: FormData;
}
