/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createAccountRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__ACCOUNT:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const loadProfileDetailsRoutine = createAccountRoutine('LOAD_PROFILE_DETAILS');
export const saveProfileDetailsRoutine = createAccountRoutine('SAVE_PROFILE_DETAILS');
export const uploadAvatarRoutine = createAccountRoutine('UPLOAD_AVATAR');
