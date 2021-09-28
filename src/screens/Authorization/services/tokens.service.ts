import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Authorization/constants';
import { refresh } from '@screens/Authorization/services/auth.service';
import { store } from '@root/store';
import { logOutRoutine } from '@screens/Authorization/routines';

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getTokens = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN)
});

export const tokensStored = (): boolean => {
  const { accessToken, refreshToken } = getTokens();
  return (accessToken && accessToken !== '') && (refreshToken && refreshToken !== '');
};

/**
 * @return if refresh was successful
 */
export const refreshAccessTokenOrLogout: () => Promise<boolean> = async () => {
  const { refreshToken } = getTokens();
  try {
    const resp = await refresh(refreshToken);
    localStorage.setItem(ACCESS_TOKEN, resp.accessToken);
    return true;
  } catch (e) {
    store.dispatch(logOutRoutine.trigger());
    return false;
  }
};
