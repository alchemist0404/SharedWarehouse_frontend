import * as queryString from 'query-string';
import { toastr } from 'react-redux-toastr';
import { IFetchArgsData } from 'models/IFetchArgsData';
import { IFetchArgs } from 'models/IFetchArgs';
import { getTokens, refreshAccessTokenOrLogout } from '@screens/Authorization/services/tokens.service';
import { store } from '@root/store';
import { logOutRoutine } from '@screens/Authorization/routines';

const formatEndpoint = endpoint => {
  let formattedEndpoint = endpoint;
  if (!formattedEndpoint.startsWith('/')) {
    formattedEndpoint = `/${formattedEndpoint}`;
  }
  if (!formattedEndpoint.startsWith('/api/')) {
    formattedEndpoint = `/api${formattedEndpoint}`;
  }
  return formattedEndpoint;
};

const getFetchUrl = ({ endpoint, queryParams }: IFetchArgsData) => `${formatEndpoint(endpoint)}${
  queryParams ? `?${queryString.stringify(queryParams)}` : ''
}`;

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();
  const { accessToken } = getTokens();
  if (accessToken) {
    headers.append('authorization', `Bearer ${accessToken}`);
  }
  if (hasContent) {
    headers.append('content-type', contentType);
  }
  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = args.formData ? getInitHeaders('', false) : getInitHeaders();

  if (args.requestData && args.method === 'GET') {
    throw new Error('GET request does not support request body.');
  }

  let body = {};
  if (args.method !== 'GET') {
    body = { body: args.formData ? args.formData : JSON.stringify(args.requestData) };
  }

  return {
    method: args.method,
    headers,
    ...body
  };
};

let retryOrThrowFailedResponse;

export const callApi = async (args: IFetchArgsData): Promise<any | string> => {
  const fetchArgs = getFetchArgs(args);
  const res = await fetch(getFetchUrl(args), fetchArgs);
  if (!res.ok) {
    return retryOrThrowFailedResponse(res, args);
  }

  if (res.headers.get('content-type') === 'application/json') {
    return res.json();
  }
  return res.text();
};

retryOrThrowFailedResponse = async (res: Response, requestArgs: IFetchArgsData) => {
  let parsedException = { message: 'Can\'t read the response' };
  try {
    parsedException = await res.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('An error occurred, can\'t read the response', err);
    toastr.error('Error', err);
  }
  if (res.status === 401) {
    if (parsedException.message === 'Token expired') {
      const isRefreshed = await refreshAccessTokenOrLogout();
      if (isRefreshed) {
        return callApi(requestArgs);
      }
    } else {
      store.dispatch(logOutRoutine.trigger());
    }
  }
  throw parsedException;
};
