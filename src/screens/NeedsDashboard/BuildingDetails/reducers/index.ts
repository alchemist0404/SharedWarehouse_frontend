import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { buildingDetailsReducer } from '@screens/NeedsDashboard/BuildingDetails/containers/BuildingDetailsPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  requestBookingRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BuildingDetails/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  requestBookingRequest: reducerCreator([requestBookingRoutine.TRIGGER]),
  fetchSpaceAvailabilityRequest: reducerCreator([fetchSpaceAvailabilityRoutine.TRIGGER]),
  fetchBuildingDetailsRequest: reducerCreator([fetchBuildingDetailsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: buildingDetailsReducer
});

const reqs = (state: RootState) => state.needsDashboard.buildingDetails.requests;
const data = (state: RootState) => state.needsDashboard.buildingDetails.data;

export const extractBuildingDetails = state => data(state).building;
export const extractSpaces = state => data(state).spaces;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractToggleFavoriteBuildingLoading = state => reqs(state).toggleFavoriteBuildingRequest.loading;
export const extractToggleFavoriteBuildingError = state => reqs(state).toggleFavoriteBuildingRequest.error;
export const extractRequestBookingLoading = state => reqs(state).requestBookingRequest.loading;
export const extractRequestBookingError = state => reqs(state).requestBookingRequest.error;
export const extractFetchSpaceAvailabilityLoading = state => reqs(state).fetchSpaceAvailabilityRequest.loading;
export const extractFetchSpaceAvailabilityError = state => reqs(state).fetchSpaceAvailabilityRequest.error;
export const extractFetchBuildingDetailsLoading = state => reqs(state).fetchBuildingDetailsRequest.loading;
export const extractFetchBuildingDetailsError = state => reqs(state).fetchBuildingDetailsRequest.error;
