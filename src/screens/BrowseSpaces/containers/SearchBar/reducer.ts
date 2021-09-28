import { Routine } from 'redux-saga-routines';
import { IQueryData } from '@screens/BrowseSpaces/model/QueryData';
import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import {
  clearFiltersRoutine,
  performSearchRoutine,
  setPageIndexRoutine,
  setPageSizeRoutine,
  updateSearchQueryRoutine
} from '@screens/BrowseSpaces/routines';
import { setSearchFiltersRoutine } from '@screens/Landing/routines';

export interface IQueryReducerState extends IQueryData {
  pendingText: string;
}

const initialState: IQueryReducerState = {
  text: '',
  page: 1,
  size: PageSize.TWENTY_FIVE,
  pendingText: ''
};

export const searchBarReducer = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case setPageSizeRoutine.FULFILL:
      return {
        ...state,
        size: action.payload,
        page: 1
      };
    case setPageIndexRoutine.FULFILL:
      return {
        ...state,
        page: action.payload
      };
    case performSearchRoutine.TRIGGER:
      return {
        ...state,
        page: state.text !== state.pendingText ? 1 : state.page,
        text: state.pendingText
      };
    case setSearchFiltersRoutine.SUCCESS:
      return action.payload;
    case clearFiltersRoutine.FULFILL:
      return initialState;
    case updateSearchQueryRoutine.FULFILL:
      return {
        ...state,
        ...action.payload,
        page: 1
      };
    default:
      return state;
  }
};
