import React from 'react';
import { IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import {
  extractCompleteScheduleLoading,
  extractFetchSchedulesLoading,
  extractReviewedSchedule,
  extractReviewScheduleLoading,
  extractSchedules
} from '@screens/HavesDashboard/DropOffAndPickUp/reducers';
import {
  completeScheduleRoutine,
  fetchSchedulesRoutine,
  reviewScheduleRoutine,
  setReviewedScheduleRoutine
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import BookingDetailsModal from '@containers/Schedules/BookingDetailsModal';
import ReviewingSchedulesSegment from '@root/screens/HavesDashboard/DropOffAndPickUp/containers/SchedulesSegment';
import BookingDetails from '@screens/HavesDashboard/DropOffAndPickUp/components/BookingDetails';
import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import { Role } from '@screens/Authorization/models/Roles';

export interface IHavesBookingDetailsModalProps extends IState, IActions {
  expandedBooking: IBookingDetailsForSchedulingDto;
  setExpandedBooking: React.Dispatch<React.SetStateAction<IBookingDetailsForSchedulingDto>>;
}

interface IState {
  schedulesLoading: boolean;
  schedules: IScheduleResponseDto[];
  reviewedScheduleData: IScheduleResponseDto;
  completeLoading: boolean;
  reviewLoading: boolean;
}

interface IActions {
  loadSchedules: IBindingCallback1<string>;
  setReviewedScheduleData: IBindingCallback1<IScheduleResponseDto>;
  completeSchedule: IBindingCallback1<IScheduleResponseDto>;
  reviewSchedule: IBindingCallback1<IScheduleReviewRequest>;
}

const ConnectedBookingDetailsModal: React.FC<IHavesBookingDetailsModalProps> = (
  {
    loadSchedules, expandedBooking, setExpandedBooking, schedules, schedulesLoading,
    reviewedScheduleData, setReviewedScheduleData, reviewSchedule, reviewLoading,
    completeLoading, completeSchedule
  }
) => (
  <BookingDetailsModal
    open={expandedBooking !== undefined}
    onClose={() => setExpandedBooking(undefined)}
    content={expandedBooking}
    schedulesSegmentProps={{
      schedulesRequestDetails: {
        loading: schedulesLoading,
        load: loadSchedules,
        items: schedules
      },
      bookingId: expandedBooking?.booking.id,
      expandedScheduleData: reviewedScheduleData,
      setExpandedScheduleData: setReviewedScheduleData,
      decisionLoading: reviewLoading,
      reviewSchedule,
      completeLoading,
      completeSchedule
    }}
    bookingDetailsComponent={BookingDetails}
    schedulesSegmentComponent={ReviewingSchedulesSegment}
    currentRole={Role.HAVE}
  />
);

const mapStateToProps: (state) => IState = state => ({
  schedulesLoading: extractFetchSchedulesLoading(state),
  schedules: extractSchedules(state),
  reviewedScheduleData: extractReviewedSchedule(state),
  completeLoading: extractCompleteScheduleLoading(state),
  reviewLoading: extractReviewScheduleLoading(state)
});

const mapDispatchToProps: IActions = {
  loadSchedules: fetchSchedulesRoutine,
  setReviewedScheduleData: setReviewedScheduleRoutine.fulfill,
  completeSchedule: completeScheduleRoutine,
  reviewSchedule: reviewScheduleRoutine
};

export { ConnectedBookingDetailsModal };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedBookingDetailsModal);
