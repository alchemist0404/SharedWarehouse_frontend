import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */
import {
  bookSpacesRoutine,
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/BuildingDetails/routines';
import { buildingDetailsReducer } from '@screens/BuildingDetails/containers/reducer';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  bookSpacesRequest: reducerCreator([bookSpacesRoutine.TRIGGER]),
  buildingDetailsRequest: reducerCreator([fetchBuildingDetailsRoutine.TRIGGER]),
  availableSpacesRequest: reducerCreator([fetchSpaceAvailabilityRoutine.TRIGGER])
});

export default combineReducers({
  details: buildingDetailsReducer,
  requests
});

const reqs = (state: RootState) => state.buildingDetails.requests;
const detailsReducer = (state: RootState) => state.buildingDetails.details;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractToggleFavoriteBuildingLoading = state => reqs(state).toggleFavoriteBuildingRequest.loading;
export const extractToggleFavoriteBuildingError = state => reqs(state).toggleFavoriteBuildingRequest.error;
export const extractBookSpacesLoading = state => reqs(state).bookSpacesRequest.loading;
export const extractBookSpacesError = state => reqs(state).bookSpacesRequest.error;
export const extractBuildingDetailsLoading = state => reqs(state).buildingDetailsRequest.loading;
export const extractBuildingDetailsError = state => reqs(state).buildingDetailsRequest.error;
export const extractAvailableSpacesLoading = state => reqs(state).availableSpacesRequest.loading;
export const extractAvailableSpacesError = state => reqs(state).availableSpacesRequest.error;

export const extractBuildingDetails = state => detailsReducer(state).building;
export const extractBuildingDetailsSpaces = state => detailsReducer(state).spaces;
