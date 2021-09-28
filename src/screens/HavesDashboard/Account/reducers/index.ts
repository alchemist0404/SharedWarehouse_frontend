import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { accountReducer } from '@screens/HavesDashboard/Account/containers/AccountPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/HavesDashboard/Account/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  loadProfileDetailsRequest: reducerCreator([loadProfileDetailsRoutine.TRIGGER]),
  saveProfileDetailsRequest: reducerCreator([saveProfileDetailsRoutine.TRIGGER]),
  uploadAvatarRequest: reducerCreator([uploadAvatarRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: accountReducer
});

const reqs = (state: RootState) => state.havesDashboard.account.requests;
const data = (state: RootState) => state.havesDashboard.account.data;

export const extractProfileData = state => data(state).profile;
export const extractAvatar = state => data(state).profile?.avatar;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractLoadProfileDetailsLoading = state => reqs(state).loadProfileDetailsRequest.loading;
export const extractLoadProfileDetailsError = state => reqs(state).loadProfileDetailsRequest.error;
export const extractSaveProfileDetailsLoading = state => reqs(state).saveProfileDetailsRequest.loading;
export const extractSaveProfileDetailsError = state => reqs(state).saveProfileDetailsRequest.error;
export const extractUploadAvatarLoading = state => reqs(state).uploadAvatarRequest.loading;
export const extractUploadAvatarError = state => reqs(state).uploadAvatarRequest.error;
