/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';

const createDropOffAndPickUpRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`NEEDS_DASHBOARD__DROP_OFF_AND_PICK_UP:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setExpandedBookingRoutine = createDropOffAndPickUpRoutine('SET_EXPANDED_BOOKING');
export const cancelBookingRoutine = createDropOffAndPickUpRoutine<IBookingCancellationRequest>('CANCEL_BOOKING');
export const setEditedScheduleRoutine = createDropOffAndPickUpRoutine<IScheduleResponseDto>('SET_EDITED_SCHEDULE');
export const saveScheduleRoutine = createDropOffAndPickUpRoutine<IScheduleDto>('SAVE_SCHEDULE');
export const fetchSchedulesRoutine = createDropOffAndPickUpRoutine('FETCH_SCHEDULES');
export const setCurrentPageRoutine = createDropOffAndPickUpRoutine<number>('SET_CURRENT_PAGE');
export const fetchActiveBookingsRoutine = createDropOffAndPickUpRoutine<IPageRequest>('FETCH_ACTIVE_BOOKINGS');
export const cancelScheduleRoutine = createDropOffAndPickUpRoutine<string>('CANCEL_SCHEDULE');
