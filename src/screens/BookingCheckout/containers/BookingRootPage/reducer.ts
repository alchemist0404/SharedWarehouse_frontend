import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IBookingCheckoutData } from '@screens/BookingCheckout/model/BookingCheckout';
import { loadBookingDetailsRoutine, toggleFavoriteRoutine } from '@screens/BookingCheckout/routines';

export interface IBookingDetailsReducerState {
  bookingDetails: IBookingCheckoutData;
}

const initialState: IBookingDetailsReducerState = {
  bookingDetails: undefined
};

export const bookingRootPageReducer = createReducer(initialState, {
  [loadBookingDetailsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IBookingCheckoutData>) => {
    state.bookingDetails = payload;
  },
  [toggleFavoriteRoutine.SUCCESS]: state => {
    state.bookingDetails.building.favorite = !state.bookingDetails.building.favorite;
  }
});
