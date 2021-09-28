/* eslint-disable max-len */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  completeScheduleRoutine,
  fetchSchedulesRoutine,
  reviewScheduleRoutine,
  setReviewedScheduleRoutine
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { ScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IDropOffAndPickUpReducerState {
  schedules: IScheduleResponseDto[];
  reviewedSchedule?: IScheduleResponseDto;
}

const initialState: IDropOffAndPickUpReducerState = {
  schedules: []
};

export const bookingModalReducer = createReducer(initialState, {
  [fetchSchedulesRoutine.SUCCESS]: (state, { payload }: PayloadAction<IScheduleResponseDto[]>) => {
    state.schedules = payload;
  },
  [setReviewedScheduleRoutine.FULFILL]: (state, { payload }: PayloadAction<IScheduleResponseDto | undefined>) => {
    state.reviewedSchedule = payload;
  },
  [reviewScheduleRoutine.SUCCESS]: (state, { payload: { approved, scheduleId } }: PayloadAction<IScheduleReviewRequest>) => {
    state.reviewedSchedule = undefined;
    state.schedules.find(sch => sch.id === scheduleId).status = approved ? ScheduleStatus.ACCEPTED : ScheduleStatus.REJECTED;
  },
  [completeScheduleRoutine.SUCCESS]: (state, { payload }: PayloadAction<IScheduleResponseDto>) => {
    const schedule = state.schedules.find(sch => sch.id === payload.id);
    schedule.status = ScheduleStatus.COMPLETED;
    schedule.scheduledTime = new Date().toString();
  }
});
