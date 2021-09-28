import { Routine } from 'redux-saga-routines';
import { IBuildingDetailsWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import {
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BuildingDetails/routines';
import { findAndReplaceThenDispose } from '@screens/BuildingDetails/containers/reducer';

export type IBuildingDetailsReducerState = IBuildingDetailsWithAvailability

const initialState: IBuildingDetailsReducerState = {
  building: undefined,
  spaces: []
};

export const buildingDetailsReducer = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchBuildingDetailsRoutine.SUCCESS:
      return action.payload.buildingResult;
    case fetchSpaceAvailabilityRoutine.SUCCESS:
      return {
        ...state,
        spaces: findAndReplaceThenDispose(state.spaces, action.payload, (el1, el2) => el1.id === el2.id)
      };
    case toggleFavoriteBuildingRoutine.SUCCESS:
      return {
        ...state,
        building: {
          ...state.building,
          favorite: !state.building.favorite
        }
      };
    default:
      return state;
  }
};
