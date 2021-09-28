import { Routine } from 'redux-saga-routines';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/NeedsDashboard/Account/routines';

export interface IAccountReducerState {
  profile: IProfileData;
}

const initialState: IAccountReducerState = {
  profile: undefined
};

export const accountReducer = (state = initialState, action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case saveProfileDetailsRoutine.SUCCESS:
    case loadProfileDetailsRoutine.SUCCESS:
      return {
        ...state,
        profile: payload
      };
    case uploadAvatarRoutine.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: payload
        }
      };
    default:
      return state;
  }
};
