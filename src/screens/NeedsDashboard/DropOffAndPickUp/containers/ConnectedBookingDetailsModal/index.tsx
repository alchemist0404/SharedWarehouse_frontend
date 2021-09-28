import React from 'react';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import {
  extractCancelBookingLoading,
  extractEditedSchedule,
  extractFetchSchedulesLoading,
  extractSaveScheduleLoading,
  extractSchedules
} from '@screens/NeedsDashboard/DropOffAndPickUp/reducers';
import {
  cancelBookingRoutine,
  cancelScheduleRoutine,
  fetchSchedulesRoutine,
  saveScheduleRoutine,
  setEditedScheduleRoutine
} from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import BookingDetailsModal, { IBookingDetailsModalProps } from '@containers/Schedules/BookingDetailsModal';
import BookingDetails from '@containers/Schedules/BookingDetailsModal/BookingDetails';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import EditingSchedulesSegment, { IEditingSchedulesSegmentProps } from '@screens/NeedsDashboard/DropOffAndPickUp/components/EditingSchedulesSegment';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import { Role } from '@screens/Authorization/models/Roles';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';

export interface IConnectedBookingDetailsModalProps extends IState, IActions {
  expandedBooking: IBookingDetailsForSchedulingDto;
  setExpandedBooking: IBindingCallback1<IBookingDetailsForSchedulingDto | undefined>;
}

interface IState {
  schedulesLoading: boolean;
  schedules: IScheduleResponseDto[];
  scheduleSaveLoading: boolean;
  editedScheduleData: IScheduleResponseDto;
  cancellationLoading: boolean;
}

interface IActions {
  loadSchedules: IBindingCallback1<string>;
  saveSchedule: IBindingCallback1<IScheduleDto>;
  cancelSchedule: IBindingCallback1<string>;
  setEditedScheduleData: IBindingCallback1<IScheduleResponseDto>;
  cancelBooking: IBindingCallback1<IBookingCancellationRequest>;
}

const NeedsBookingDetailsModal = (
  props: IBookingDetailsModalProps<IEditingSchedulesSegmentProps, IBriefBookingDto>
) => BookingDetailsModal(props);

const ConnectedBookingDetailsModal: React.FC<IConnectedBookingDetailsModalProps> = (
  {
    saveSchedule, cancelSchedule, loadSchedules, expandedBooking, setExpandedBooking,
    scheduleSaveLoading, schedules, schedulesLoading, editedScheduleData, setEditedScheduleData,
    cancelBooking, cancellationLoading
  }
) => (
  <NeedsBookingDetailsModal
    open={expandedBooking !== undefined}
    onClose={() => setExpandedBooking(undefined)}
    content={expandedBooking}
    schedulesSegmentProps={{
      schedulesRequestDetails: {
        loading: schedulesLoading,
        load: loadSchedules,
        items: schedules
      },
      saveSchedule,
      cancelSchedule,
      saveLoading: scheduleSaveLoading,
      bookingId: expandedBooking?.booking.id,
      expandedScheduleData: editedScheduleData,
      setExpandedScheduleData: setEditedScheduleData,
      bookingDetails: expandedBooking
    }}
    bookingDetailsComponent={BookingDetails}
    schedulesSegmentComponent={EditingSchedulesSegment}
    currentRole={Role.NEED}
    onCancellationSubmit={cancelBooking}
    cancellationLoading={cancellationLoading}
  />
);

const mapStateToProps: (state) => IState = state => ({
  schedulesLoading: extractFetchSchedulesLoading(state),
  schedules: extractSchedules(state),
  scheduleSaveLoading: extractSaveScheduleLoading(state),
  editedScheduleData: extractEditedSchedule(state),
  cancellationLoading: extractCancelBookingLoading(state)
});

const mapDispatchToProps: IActions = {
  loadSchedules: fetchSchedulesRoutine,
  saveSchedule: saveScheduleRoutine,
  cancelSchedule: cancelScheduleRoutine,
  setEditedScheduleData: setEditedScheduleRoutine.fulfill,
  cancelBooking: cancelBookingRoutine
};

export { ConnectedBookingDetailsModal };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedBookingDetailsModal);
