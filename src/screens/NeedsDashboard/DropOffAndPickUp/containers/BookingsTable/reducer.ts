/* eslint-disable max-len */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import {
  cancelBookingRoutine,
  fetchActiveBookingsRoutine,
  setCurrentPageRoutine
} from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { IPageableResult } from '@models/domain/PageableResult';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';
import moment from 'moment';

export const bookingsTableReducer = createReducer(getInitialPageableState<IBookingDetailsForSchedulingDto>(), {
  [fetchActiveBookingsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPageableResult<IBookingDetailsForSchedulingDto>>) => {
    state.items = payload.items;
    state.totalPages = payload.totalPages;
    state.totalResults = payload.totalResults;
  },
  [setCurrentPageRoutine.FULFILL]: (state, { payload }) => {
    state.page = payload;
  },
  [cancelBookingRoutine.SUCCESS]: (state, { payload }: PayloadAction<IBookingCancellationRequest>) => {
    const item = state.items.find(i => i.booking.id === payload.bookingId);
    item.booking.endingDate = moment(payload.cancellationDate).subtract(1, 'day').toDate();
  }
});
