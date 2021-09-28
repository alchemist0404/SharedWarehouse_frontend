/* eslint-disable max-len */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAvailableAndScheduledSpaces
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { IAvailableAndScheduledSpaces } from '../../model/AvailableAndScheduledSpaces';

export interface IDropOffAndPickUpReducerState {
  availableAndScheduleSpaces: IAvailableAndScheduledSpaces;
}

const initialState: IDropOffAndPickUpReducerState = {
  availableAndScheduleSpaces: {
    availableSpaces: [],
    scheduledSpaces: []
  }
};

export const scheduleSegmentReducer = createReducer(initialState, {
  [fetchAvailableAndScheduledSpaces.SUCCESS]: (state, { payload }: PayloadAction<IAvailableAndScheduledSpaces>) => {
    state.availableAndScheduleSpaces = payload;
  }
});
