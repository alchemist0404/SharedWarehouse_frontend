import React, { useMemo, useState } from 'react';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { IBindingCallback1 } from '@models/Callbacks';
import { Button, Confirm, Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import ScheduleForm from './ScheduleForm';
import { IModalProps } from '@containers/Schedules/BookingDetailsModal';
import {
  IBookingDetailsForSchedulingDto,
  ITemplate2Amount,
  t2aToSpaceWithAvailability
} from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { ScheduleType, schTypeKey } from '@models/domain/schedule/ScheduleType';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { formToSchedule } from '@screens/NeedsDashboard/DropOffAndPickUp/components/EditingSchedulesSegment/ScheduleSavingModal/ScheduleForm/utils';
import styles from './styles.module.scss';
import { ScheduleStatus } from '@root/models/domain/schedule/ScheduleStatus';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import { IScheduleSpaceNoteDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleSpaceNoteDto';

export interface IScheduleSavingModalProps extends IModalProps {
  saveLoading: boolean;
  scheduleLoading?: boolean;
  modalProps: ISavingModalProps | undefined;
  createdSchedules: IScheduleResponseDto[];
  bookingDetails: IBookingDetailsForSchedulingDto;
}

export interface ISavingModalProps {
  initialData?: IScheduleResponseDto;
  save: IBindingCallback1<IScheduleDto>;
  cancelSchedule: IBindingCallback1<string>;
}

interface ITemplateIdToAmount {
  [id: string]: number;
}

const getPastCompleted = (list: IScheduleResponseDto[]) => (
  list
    .filter(sch => sch.status === ScheduleStatus.COMPLETED)
);

const calcFilledSpaces = (schedules: IScheduleResponseDto[]): IScheduleSpaceNoteDto[] => {
  let filledSpaces = [] as IScheduleSpaceNoteDto[];
  getPastCompleted(schedules)
    .reverse()
    .forEach(sch => {
      switch (sch.type) {
        case schTypeKey(ScheduleType.DROP_OFF):
          sch.spaces.forEach(space => filledSpaces.push(space));
          break;
        case schTypeKey(ScheduleType.PICK_UP):
          sch.spaces.forEach(space => { filledSpaces = filledSpaces.filter(s => s.id !== space.id); });
          break;
        default:
          throw new Error();
      }
    });
  return filledSpaces;
};

const calcEmptySpaces = (
  bookedT2A: ITemplate2Amount[], schedules: IScheduleResponseDto[]
): ISpaceWithAvailability[] => {
  let emptySpaceIds = bookedT2A.flatMap(t => t.spaceIds);
  getPastCompleted(schedules)
    .reverse()
    .forEach(sch => {
      switch (sch.type) {
        case schTypeKey(ScheduleType.DROP_OFF):
          sch.spaces.forEach(space => { emptySpaceIds = emptySpaceIds.filter(id => id !== space.id); });
          break;
        case schTypeKey(ScheduleType.PICK_UP):
          sch.spaces.forEach(space => emptySpaceIds.push(space.id));
          break;
        default:
          throw new Error();
      }
    });
  return bookedT2A
    .map(t2a => ({
      ...t2a,
      spaceIds: t2a.spaceIds.filter(id => emptySpaceIds.includes(id))
    }))
    .map(t2aToSpaceWithAvailability);
};

const ScheduleSavingModal: React.FC<IScheduleSavingModalProps> = (
  { modalProps, onClose, saveLoading, scheduleLoading, bookingDetails, createdSchedules }
) => {
  const { initialData: editedSchedule, cancelSchedule, save } = modalProps || {};
  const [availableSpaces, setAvailableSpaces] = useState<ISpaceWithAvailability[]>([]);
  const [filledSpaces, setFilledSpaces] = useState<IScheduleSpaceNoteDto[]>([]);
  const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);

  const createdSchedulesWithoutEdited = useMemo(
    () => createdSchedules?.filter(sch => sch.id !== editedSchedule?.id),
    [createdSchedules, editedSchedule]
  );
  const createdDropOffs = useMemo(
    () => createdSchedulesWithoutEdited?.filter(sch => sch.type === schTypeKey(ScheduleType.DROP_OFF)),
    [createdSchedulesWithoutEdited]
  );
  const createdPickUps = useMemo(
    () => createdSchedulesWithoutEdited?.filter(sch => sch.type === schTypeKey(ScheduleType.PICK_UP)),
    [createdSchedulesWithoutEdited]
  );

  const bookedT2A = bookingDetails.templatesToAmounts;

  const updateAvailableSpaces = (newDate: Date) => {
    if (newDate) {
      setAvailableSpaces(calcEmptySpaces(bookedT2A, createdSchedulesWithoutEdited));
      setFilledSpaces(calcFilledSpaces(createdSchedulesWithoutEdited));
    }
  };

  const cancelScheduleAndClose = () => {
    cancelSchedule(editedSchedule?.id);
    setCancelConfirmationOpen(false);
    onClose();
  };

  const isNew = !editedSchedule?.id;
  const existsAnotherActiveDropOff = !!createdDropOffs?.filter(
    sch => [ScheduleStatus.PENDING, ScheduleStatus.ACCEPTED].includes(sch.status)
  )?.length;
  const existsAnotherActivePickUp = !!createdPickUps?.filter(
    sch => [ScheduleStatus.PENDING, ScheduleStatus.ACCEPTED].includes(sch.status)
  )?.length;

  return (
    <Modal onClose={onClose} open={editedSchedule !== undefined} closeIcon size="tiny">
      {editedSchedule !== undefined && (
        <>
          <ModalHeader>
            {!isNew ? (
              <div className={styles.modal_header}>
                <span className={styles.margin_right}>Schedule details</span>
                <Button
                  color="red"
                  content="Cancel schedule"
                  onClick={() => setCancelConfirmationOpen(!cancelConfirmationOpen)}
                  disabled={
                    editedSchedule?.status !== ScheduleStatus.PENDING
                    && editedSchedule?.status !== ScheduleStatus.ACCEPTED
                  }
                />
                <Confirm
                  open={cancelConfirmationOpen}
                  onCancel={() => setCancelConfirmationOpen(false)}
                  onConfirm={cancelScheduleAndClose}
                  header="Cancel the schedule"
                />
              </div>
            ) : (
              <div>Create schedule</div>
            )}
          </ModalHeader>
          <ModalContent>
            <ScheduleForm
              save={formData => save({
                ...formToSchedule(formData),
                id: editedSchedule?.id,
                bookingId: bookingDetails.booking.id
              })}
              saveLoading={saveLoading}
              initialValuesLoading={scheduleLoading}
              availableSpaces={availableSpaces}
              updateAvailableSpaces={updateAvailableSpaces}
              editedSchedule={editedSchedule}
              bookingDetails={bookingDetails}
              existsAnotherActiveDropOff={existsAnotherActiveDropOff}
              existsAnotherActivePickUp={existsAnotherActivePickUp}
              filledSpaces={filledSpaces}
              templatesWithSpaces={bookedT2A}
            />
          </ModalContent>
        </>
      )}
    </Modal>
  );
};

export default ScheduleSavingModal;
