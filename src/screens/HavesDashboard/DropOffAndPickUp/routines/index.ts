/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IBookingNeedsReviewUpdate } from '@screens/HavesDashboard/DropOffAndPickUp/model/BookingNeedsReviewUpdate';
import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import { ISpaceIdsWithScheduleId } from '../model/SpaceIdsWithScheduleId';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

const createDropOffAndPickUpRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__DROP_OFF_AND_PICK_UP:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setBookingNeedsReviewRoutine = createDropOffAndPickUpRoutine<IBookingNeedsReviewUpdate>('SET_BOOKING_NEEDS_REVIEW');
export const setReviewedScheduleRoutine = createDropOffAndPickUpRoutine('SET_REVIEWED_SCHEDULE');
export const reviewScheduleRoutine = createDropOffAndPickUpRoutine<IScheduleReviewRequest>('REVIEW_SCHEDULE');
export const completeScheduleRoutine = createDropOffAndPickUpRoutine<IScheduleResponseDto>('COMPLETE_SCHEDULE');
export const setCurrentPageRoutine = createDropOffAndPickUpRoutine('SET_CURRENT_PAGE');
export const fetchSchedulesRoutine = createDropOffAndPickUpRoutine('FETCH_SCHEDULES');
export const fetchActiveBookingsRoutine = createDropOffAndPickUpRoutine<IPageRequest>('FETCH_ACTIVE_BOOKINGS');
export const fetchAvailableAndScheduledSpaces = createDropOffAndPickUpRoutine<string>('FETCH_AVAILABLE_AND_SCHEDULED_SPACES');
export const updateScheduleWithNewSpaces = createDropOffAndPickUpRoutine<ISpaceIdsWithScheduleId>('UPDATE_SCHEDULE_WITH_NEW_SPACES');
