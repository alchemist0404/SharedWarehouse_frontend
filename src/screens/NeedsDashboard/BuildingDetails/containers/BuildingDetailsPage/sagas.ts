import { all, takeEvery } from 'redux-saga/effects';
import {
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  requestBookingRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BuildingDetails/routines';
import {
  tryBookSpaces,
  tryFetchBuildingDetails,
  tryFetchSpaceAvailability
} from '@screens/BuildingDetails/containers/BuildingDetailsPage/sagas';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export default function* buildingDetailsPageSagas() {
  yield all([
    yield takeEvery(fetchBuildingDetailsRoutine.TRIGGER, tryFetchBuildingDetails(fetchBuildingDetailsRoutine)),
    yield takeEvery(fetchSpaceAvailabilityRoutine.TRIGGER, tryFetchSpaceAvailability(fetchSpaceAvailabilityRoutine)),
    yield takeEvery(requestBookingRoutine.TRIGGER, tryBookSpaces(requestBookingRoutine)),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
