import React, { useEffect } from 'react';
import { Divider, Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { IBookingDetailsProps } from './BookingDetails';
import BuildingDetails from './BuildingDetails';
import SpacesDetails from './SpacesDetails';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { ICommonSchedulesSegmentProps } from '@containers/Schedules/SchedulesSegment/Props';
import { Role } from '@screens/Authorization/models/Roles';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';

export interface IBookingDetailsModalProps<SchedulesProps extends ICommonSchedulesSegmentProps, BookingDto extends IBriefBookingDto> extends IModalProps {
  content: IBookingDetailsForSchedulingDto;
  schedulesSegmentProps: SchedulesProps;
  bookingDetailsComponent: React.FC<IBookingDetailsProps<BookingDto>>;
  schedulesSegmentComponent: React.FC<SchedulesProps>;
  currentRole: Role;
  onCancellationSubmit?: IBindingCallback1<IBookingCancellationRequest>;
  cancellationLoading?: boolean;
}

export interface IModalProps {
  open: boolean;
  onClose: IBindingAction;
}

function BookingDetailsModal<SchedulesProps extends ICommonSchedulesSegmentProps, BookingDto extends IBriefBookingDto>(
  {
    onClose, content, open, schedulesSegmentProps, bookingDetailsComponent: BookingDetailsComponent,
    schedulesSegmentComponent: SchedulesSegmentComponent, currentRole, onCancellationSubmit, cancellationLoading
  }: IBookingDetailsModalProps<SchedulesProps, BookingDto>
) {
  const { building, booking, templatesToAmounts } = content || {};
  const { load: loadSchedules } = schedulesSegmentProps.schedulesRequestDetails;

  useEffect(() => {
    if (booking?.id) loadSchedules(booking.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking]);

  return (
    <Modal open={open} onClose={onClose} closeIcon>
      {open && (
        <>
          <ModalHeader>Booking details</ModalHeader>
          <ModalContent>
            <BookingDetailsComponent
              booking={booking as BookingDto}
              currentRole={currentRole}
              onCancellationSubmit={onCancellationSubmit}
              cancellationLoading={cancellationLoading}
            />
            <BuildingDetails building={building} />
            <SpacesDetails templatesToAmounts={templatesToAmounts} />
            <Divider />
            <SchedulesSegmentComponent {...schedulesSegmentProps} />
          </ModalContent>
        </>
      )}
    </Modal>
  );
}

export default BookingDetailsModal;
