import { Routine } from 'redux-saga-routines';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { fetchBookingsRoutine, fetchTransactionsRoutine } from '@screens/UserMain/routines';
import { ITransaction } from '@screens/UserMain/model/Transaction';

export interface IUserMainReducerState {
  bookings: IBriefBookingDto[];
  transactions: ITransaction[];
}

const initialState: IUserMainReducerState = {
  bookings: [],
  transactions: []
};

export const userMainReducer = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchBookingsRoutine.SUCCESS:
      return {
        ...state,
        bookings: action.payload
      };
    case fetchTransactionsRoutine.SUCCESS:
      return {
        ...state,
        transactions: action.payload.items
      };
    default:
      return state;
  }
};
