import { combineReducers } from 'redux';
import { RootState } from '@root/store';
/* PlopJS import placeholder. Do not remove */
import {
  completeScheduleRoutine,
  fetchActiveBookingsRoutine,
  fetchSchedulesRoutine,
  reviewScheduleRoutine,
  setBookingNeedsReviewRoutine,
  setCurrentPageRoutine,
  setReviewedScheduleRoutine
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { reducerCreator } from '@helpers/reducer.helper';
import { bookingTableReducer } from '@screens/HavesDashboard/DropOffAndPickUp/containers/BookingsTable/reducer';
import { bookingModalReducer } from '@screens/HavesDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal/reducer';
import { scheduleSegmentReducer } from '../containers/SchedulesSegment/reducer';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setBookingNeedsReviewRequest: reducerCreator([setBookingNeedsReviewRoutine.TRIGGER]),
  setReviewedScheduleRequest: reducerCreator([setReviewedScheduleRoutine.TRIGGER]),
  reviewScheduleRequest: reducerCreator([reviewScheduleRoutine.TRIGGER]),
  completeScheduleRequest: reducerCreator([completeScheduleRoutine.TRIGGER]),
  setCurrentPageRequest: reducerCreator([setCurrentPageRoutine.TRIGGER]),
  fetchSchedulesRequest: reducerCreator([fetchSchedulesRoutine.TRIGGER]),
  fetchActiveBookingsRequest: reducerCreator([fetchActiveBookingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  bookingModal: bookingModalReducer,
  bookingsTable: bookingTableReducer,
  scheduleSegment: scheduleSegmentReducer
});

const reqs = (state: RootState) => state.havesDashboard.dropOffAndPickUp.requests;
const bookingModal = (state: RootState) => state.havesDashboard.dropOffAndPickUp.bookingModal;
const bookings = (state: RootState) => state.havesDashboard.dropOffAndPickUp.bookingsTable;
const scheduleSegment = (state: RootState) => state.havesDashboard.dropOffAndPickUp.scheduleSegment;

export const extractTotalPages = state => bookings(state).totalPages;
export const extractCurrentPage = state => bookings(state).page;
export const extractPageSize = state => bookings(state).pageSize;
export const extractActiveBookings = state => bookings(state).items;
export const extractSchedules = state => bookingModal(state).schedules;
export const extractReviewedSchedule = state => bookingModal(state).reviewedSchedule;
export const extractAvailableAndScheduledSpaces = state => scheduleSegment(state).availableAndScheduleSpaces;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetBookingNeedsReviewLoading = state => reqs(state).setBookingNeedsReviewRequest.loading;
export const extractSetBookingNeedsReviewError = state => reqs(state).setBookingNeedsReviewRequest.error;
export const extractSetReviewedScheduleLoading = state => reqs(state).setReviewedScheduleRequest.loading;
export const extractSetReviewedScheduleError = state => reqs(state).setReviewedScheduleRequest.error;
export const extractCompleteScheduleLoading = state => reqs(state).completeScheduleRequest.loading;
export const extractCompleteScheduleError = state => reqs(state).completeScheduleRequest.error;
export const extractReviewScheduleLoading = state => reqs(state).reviewScheduleRequest.loading;
export const extractReviewScheduleError = state => reqs(state).reviewScheduleRequest.error;
export const extractSetCurrentPageLoading = state => reqs(state).setCurrentPageRequest.loading;
export const extractSetCurrentPageError = state => reqs(state).setCurrentPageRequest.error;
export const extractFetchSchedulesLoading = state => reqs(state).fetchSchedulesRequest.loading;
export const extractFetchSchedulesError = state => reqs(state).fetchSchedulesRequest.error;
export const extractFetchActiveBookingsLoading = state => reqs(state).fetchActiveBookingsRequest.loading;
export const extractFetchActiveBookingsError = state => reqs(state).fetchActiveBookingsRequest.error;
