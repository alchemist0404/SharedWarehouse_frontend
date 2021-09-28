import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { accountReducer } from '@screens/NeedsDashboard/Account/containers/AccountPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/NeedsDashboard/Account/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  uploadAvatarRequest: reducerCreator([uploadAvatarRoutine.TRIGGER]),
  saveProfileDetailsRequest: reducerCreator([saveProfileDetailsRoutine.TRIGGER]),
  loadProfileDetailsRequest: reducerCreator([loadProfileDetailsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: accountReducer
});

const reqs = (state: RootState) => state.needsDashboard.account.requests;
const data = (state: RootState) => state.needsDashboard.account.data;

export const extractProfileData = state => data(state).profile;
export const extractAvatar = state => data(state).profile?.avatar;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractUploadAvatarLoading = state => reqs(state).uploadAvatarRequest.loading;
export const extractUploadAvatarError = state => reqs(state).uploadAvatarRequest.error;
export const extractSaveProfileDetailsLoading = state => reqs(state).saveProfileDetailsRequest.loading;
export const extractSaveProfileDetailsError = state => reqs(state).saveProfileDetailsRequest.error;
export const extractLoadProfileDetailsLoading = state => reqs(state).loadProfileDetailsRequest.loading;
export const extractLoadProfileDetailsError = state => reqs(state).loadProfileDetailsRequest.error;
