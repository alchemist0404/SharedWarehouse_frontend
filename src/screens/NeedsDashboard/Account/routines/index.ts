import { createRoutine } from 'redux-saga-routines';

const createAccountRoutine = actionName => createRoutine(`NEEDS_DASHBOARD__ACCOUNT:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const uploadAvatarRoutine = createAccountRoutine('UPLOAD_AVATAR');
export const saveProfileDetailsRoutine = createAccountRoutine('SAVE_PROFILE_DETAILS');
export const loadProfileDetailsRoutine = createAccountRoutine('LOAD_PROFILE_DETAILS');
