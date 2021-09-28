import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */
import { setExpandedBookingRoutine } from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { cancelBookingRoutine } from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import {
  fetchActiveBookingsRoutine,
  fetchSchedulesRoutine,
  saveScheduleRoutine,
  setCurrentPageRoutine,
  setEditedScheduleRoutine
} from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { bookingsTableReducer } from '@screens/NeedsDashboard/DropOffAndPickUp/containers/BookingsTable/reducer';
import { bookingDetailsModalReducer } from '@screens/NeedsDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal/reducer';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setExpandedBookingRequest: reducerCreator([setExpandedBookingRoutine.TRIGGER]),
  cancelBookingRequest: reducerCreator([cancelBookingRoutine.TRIGGER]),
  setEditedScheduleRequest: reducerCreator([setEditedScheduleRoutine.TRIGGER]),
  saveScheduleRequest: reducerCreator([saveScheduleRoutine.TRIGGER]),
  fetchSchedulesRequest: reducerCreator([fetchSchedulesRoutine.TRIGGER]),
  setCurrentPageRequest: reducerCreator([setCurrentPageRoutine.TRIGGER]),
  fetchActiveBookingsRequest: reducerCreator([fetchActiveBookingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  bookingModal: bookingDetailsModalReducer,
  bookings: bookingsTableReducer
});

const reqs = (state: RootState) => state.needsDashboard.dropOffAndPickUp.requests;
const data = (state: RootState) => state.needsDashboard.dropOffAndPickUp.bookingModal;
const bookings = (state: RootState) => state.needsDashboard.dropOffAndPickUp.bookings;

export const extractTotalPages = state => bookings(state).totalPages;
export const extractCurrentPage = state => bookings(state).page;
export const extractPageSize = state => bookings(state).pageSize;
export const extractActiveBookings = state => bookings(state).items;
export const extractSchedules = state => data(state).schedules;
export const extractExpandedBooking = state => data(state).expandedBooking;
export const extractEditedSchedule = state => data(state).editedSchedule;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetExpandedBookingLoading = state => reqs(state).setExpandedBookingRequest.loading;
export const extractSetExpandedBookingError = state => reqs(state).setExpandedBookingRequest.error;
export const extractCancelBookingLoading = state => reqs(state).cancelBookingRequest.loading;
export const extractCancelBookingError = state => reqs(state).cancelBookingRequest.error;
export const extractSetEditedScheduleLoading = state => reqs(state).setEditedScheduleRequest.loading;
export const extractSetEditedScheduleError = state => reqs(state).setEditedScheduleRequest.error;
export const extractSaveScheduleLoading = state => reqs(state).saveScheduleRequest.loading;
export const extractSaveScheduleError = state => reqs(state).saveScheduleRequest.error;
export const extractFetchSchedulesLoading = state => reqs(state).fetchSchedulesRequest.loading;
export const extractFetchSchedulesError = state => reqs(state).fetchSchedulesRequest.error;
export const extractSetCurrentPageLoading = state => reqs(state).setCurrentPageRequest.loading;
export const extractSetCurrentPageError = state => reqs(state).setCurrentPageRequest.error;
export const extractFetchActiveBookingsLoading = state => reqs(state).fetchActiveBookingsRequest.loading;
export const extractFetchActiveBookingsError = state => reqs(state).fetchActiveBookingsRequest.error;
