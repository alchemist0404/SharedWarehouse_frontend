import React, { useCallback, useEffect, useState } from 'react';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { Header } from 'semantic-ui-react';
import ScheduleSavingModal, { ISavingModalProps } from './ScheduleSavingModal';
import { IBindingCallback1 } from '@models/Callbacks';
import AdditiveListView from '@components/AdditiveListView';
import { ICommonSchedulesSegmentProps } from '@containers/Schedules/SchedulesSegment/Props';
import ScheduleRow from '@containers/Schedules/SchedulesSegment/ScheduleRow';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { BookingStatus } from '@models/domain/BookingStatus';
import { ScheduleStatus } from '@models/domain/schedule/ScheduleStatus';

export interface IEditingSchedulesSegmentProps extends ICommonSchedulesSegmentProps {
  saveSchedule: IBindingCallback1<IScheduleDto>;
  cancelSchedule: IBindingCallback1<string>;
  saveLoading: boolean;
  bookingDetails?: IBookingDetailsForSchedulingDto;
}

const EditingSchedulesSegment: React.FC<IEditingSchedulesSegmentProps> = (
  {
    schedulesRequestDetails, saveSchedule, cancelSchedule, saveLoading, expandedScheduleData, setExpandedScheduleData,
    bookingDetails
  }
) => {
  const { loading: schedulesLoading, items: schedules } = schedulesRequestDetails;
  const [modalData, setModalData] = useState<ISavingModalProps>(undefined);

  useEffect(() => {
    if (expandedScheduleData) {
      setModalData({ initialData: expandedScheduleData, save: saveSchedule, cancelSchedule });
    } else {
      setModalData(undefined);
    }
  }, [expandedScheduleData, saveSchedule, cancelSchedule]);

  const onAddClick = useCallback(() => setExpandedScheduleData({} as any),
    [setExpandedScheduleData]);

  const bookingConfirmed = bookingDetails?.booking?.status === BookingStatus.CONFIRMED;

  return (
    <>
      <ScheduleSavingModal
        createdSchedules={schedules}
        modalProps={modalData}
        saveLoading={saveLoading}
        open={modalData !== undefined}
        onClose={() => setExpandedScheduleData(undefined)}
        bookingDetails={bookingDetails}
      />
      <Header>Existing drop-offs / pick-ups</Header>
      <AdditiveListView
        loading={schedulesLoading}
        items={schedules}
        onAddClick={onAddClick}
        onItemClick={setExpandedScheduleData}
        itemDisabled={sch => !bookingConfirmed
          || ![ScheduleStatus.PENDING, ScheduleStatus.ACCEPTED].includes(sch.status)}
        renderItem={sch => <ScheduleRow schedule={sch} />}
        placeholderText="No schedules added"
        addingDisabled={!bookingConfirmed}
      />
    </>
  );
};

export default EditingSchedulesSegment;
