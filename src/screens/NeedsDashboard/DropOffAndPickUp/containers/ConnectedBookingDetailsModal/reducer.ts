import { Routine } from 'redux-saga-routines';
import {
  cancelScheduleRoutine,
  fetchSchedulesRoutine,
  saveScheduleRoutine,
  setEditedScheduleRoutine, setExpandedBookingRoutine
} from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';

export interface IDropOffAndPickUpReducerState {
  expandedBooking?: IBookingDetailsForSchedulingDto;
  schedules: IScheduleResponseDto[];
  editedSchedule?: IScheduleResponseDto;
}

const initialState: IDropOffAndPickUpReducerState = {
  schedules: []
};

const mergeSchedules = (existedSchedules: IScheduleResponseDto[], newSchedule: IScheduleResponseDto) => {
  let modified = false;
  const mergedSchedules = existedSchedules.map(sch => {
    if (sch.id === newSchedule.id) {
      modified = true;
      return newSchedule;
    }
    return sch;
  });

  if (!modified) {
    return [newSchedule, ...existedSchedules];
  }
  return mergedSchedules;
};

export const bookingDetailsModalReducer = (state = initialState, action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case setExpandedBookingRoutine.FULFILL:
      return {
        ...state,
        expandedBooking: payload
      };
    case fetchSchedulesRoutine.SUCCESS:
      return {
        ...state,
        schedules: payload
      };
    case setEditedScheduleRoutine.FULFILL:
      return {
        ...state,
        editedSchedule: payload
      };
    case saveScheduleRoutine.SUCCESS:
      return {
        ...state,
        schedules: mergeSchedules(state.schedules, payload)
      };
    case cancelScheduleRoutine.SUCCESS:
      return {
        ...state,
        schedules: mergeSchedules(state.schedules, payload)
      };
    default:
      return state;
  }
};
