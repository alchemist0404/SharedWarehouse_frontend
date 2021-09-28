import React, { useCallback } from 'react';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { Button, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IHandleCompleteScheduleModalProps {
  schedule?: IScheduleResponseDto;
  setSchedule: IBindingCallback1<IScheduleResponseDto | undefined>;
  completeSchedule: IBindingCallback1<IScheduleResponseDto>;
}

const HandleCompleteScheduleModal: React.FC<IHandleCompleteScheduleModalProps> = (
  { schedule, setSchedule, completeSchedule }
) => {
  const handleSave = useCallback(() => {
    completeSchedule(schedule);
    setSchedule(undefined);
  }, [completeSchedule, setSchedule, schedule]);

  return (
    <Modal
      open={!!schedule}
      onClose={() => setSchedule(undefined)}
      size="small"
    >
      <ModalHeader>Schedule completion</ModalHeader>
      <ModalContent>
        The scheduled time is in the future. Do you really want to mark it as completed?
      </ModalContent>
      <ModalActions>
        <Button
          color="green"
          onClick={handleSave}
          content="Complete"
        />
        <Button
          color="red"
          onClick={() => setSchedule(undefined)}
          content="Cancel"
        />
      </ModalActions>
    </Modal>
  );
};

export default HandleCompleteScheduleModal;
