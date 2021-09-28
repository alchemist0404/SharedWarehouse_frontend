import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  logOutRoutine,
  selectRolesRoutine, syncUserRoutine,
  verifyEmailActivationRoutine
} from '@screens/Authorization/routines';
import { ICurrentUser } from '@screens/Authorization/models/CurrentUser';

export interface ICurrentUserReducerState {
  user?: ICurrentUser;
  loading: boolean;
  needToFetch: boolean;
}

const initialState: ICurrentUserReducerState = {
  loading: false,
  needToFetch: true
};

export const currentUserReducer = (state = initialState, action: Routine<any>): ICurrentUserReducerState => {
  switch (action.type) {
    case fetchUserRoutine.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchUserRoutine.SUCCESS:
      return {
        user: action.payload,
        loading: false,
        needToFetch: false
      };
    case syncUserRoutine.SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case fetchUserRoutine.FAILURE:
      return {
        ...state,
        loading: false,
        needToFetch: false
      };
    case logOutRoutine.SUCCESS:
      return {
        loading: false,
        needToFetch: false
      };
    case verifyEmailActivationRoutine.SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          emailVerified: true
        }
      };
    case selectRolesRoutine.SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          roles: action.payload
        }
      };
    default:
      return state;
  }
};
