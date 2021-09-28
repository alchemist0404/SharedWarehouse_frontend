/* eslint-disable max-len */
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchActiveBookingsRoutine,
  setBookingNeedsReviewRoutine,
  setCurrentPageRoutine
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { IPageableResult } from '@models/domain/PageableResult';
import { IBookingDetailsForSchedulingWithPerson } from '@screens/HavesDashboard/DropOffAndPickUp/model/BookingDetailsForSchedulingWithPerson';
import { IBookingNeedsReviewUpdate } from '@screens/HavesDashboard/DropOffAndPickUp/model/BookingNeedsReviewUpdate';

export const bookingTableReducer = createReducer(getInitialPageableState<IBookingDetailsForSchedulingWithPerson>(), {
  [fetchActiveBookingsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPageableResult<IBookingDetailsForSchedulingWithPerson>>) => {
    state.items = payload.items;
    state.totalPages = payload.totalPages;
    state.totalResults = payload.totalResults;
  },
  [setCurrentPageRoutine.FULFILL]: (state, { payload }) => {
    state.page = payload;
  },
  [setBookingNeedsReviewRoutine.FULFILL]: (state, { payload: { needs, bookingId } }: PayloadAction<IBookingNeedsReviewUpdate>) => {
    state.items.find(it => it.booking.id === bookingId).needsReview = needs;
  }
});
