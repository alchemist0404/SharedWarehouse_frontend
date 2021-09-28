import React from 'react';
import { Button, Label, LabelGroup, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import { colorOfScheduleType, iconOfScheduleType } from '@models/domain/schedule/ScheduleType';
import moment from 'moment';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IReviewScheduleModalProps {
  expandedScheduleData: IScheduleResponseDto;
  reviewSchedule: (approved: boolean) => void;
  reviewLoading: boolean;
  setExpandedScheduleData: IBindingCallback1<IScheduleResponseDto>;
}

const ReviewScheduleModal: React.FC<IReviewScheduleModalProps> = (
  { reviewSchedule, expandedScheduleData, reviewLoading, setExpandedScheduleData }
) => (
  <Modal
    open={expandedScheduleData !== undefined}
    onClose={() => setExpandedScheduleData(undefined)}
    size="small"
  >
    <ModalHeader>Review schedule</ModalHeader>
    {expandedScheduleData && (
      <ModalContent>
        <p>{`Latest edit: ${moment(expandedScheduleData.updatedAt).format('lll')}`}</p>
        <LabelGroup>
          <span>Scheduled time:&nbsp;</span>
          <Label>{moment(expandedScheduleData.scheduledTime).format('llll')}</Label>
        </LabelGroup>
        {expandedScheduleData.notes && <p>{`Note: ${expandedScheduleData.notes}`}</p>}
        <LabelGroup>
          <span>Type:&nbsp;</span>
          <Label
            color={colorOfScheduleType(expandedScheduleData.type)}
            icon={iconOfScheduleType(expandedScheduleData.type)}
            content={expandedScheduleData.type}
          />
        </LabelGroup>
        <LabelGroup>
          <span>Booking:&nbsp;</span>
          <Label content={expandedScheduleData.bookingId} />
        </LabelGroup>
      </ModalContent>
    )}
    <ModalActions>
      <Button
        color="green"
        onClick={() => reviewSchedule(true)}
        loading={reviewLoading}
        content="Accept"
      />
      <Button
        color="red"
        onClick={() => reviewSchedule(false)}
        loading={reviewLoading}
        content="Reject"
      />
    </ModalActions>
  </Modal>
);

export default ReviewScheduleModal;
