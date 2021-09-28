import React from 'react';
import { Label, LabelGroup } from 'semantic-ui-react';
import moment from 'moment';
import { colorOfScheduleStatus, iconOfScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import { colorOfScheduleType, iconOfScheduleType, ScheduleType } from '@models/domain/schedule/ScheduleType';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IScheduleRowProps {
  schedule: IScheduleResponseDto;
}

const ScheduleRow: React.FC<IScheduleRowProps> = ({ schedule }) => (
  <>
    <LabelGroup>
      <span>Time:&nbsp;</span>
      <Label>{moment(schedule.scheduledTime).format('LLL')}</Label>
    </LabelGroup>
    <LabelGroup>
      <span>Status:&nbsp;</span>
      <Label
        content={schedule.status}
        color={colorOfScheduleStatus(schedule.status)}
        icon={iconOfScheduleStatus(schedule.status)}
      />
    </LabelGroup>
    <LabelGroup>
      <span>Type:&nbsp;</span>
      <Label
        content={ScheduleType[schedule.type]}
        color={colorOfScheduleType(schedule.type)}
        icon={iconOfScheduleType(schedule.type)}
      />
    </LabelGroup>
    {schedule.address1 && (
      <p>
        {`Address1: ${schedule.address1}. ${schedule.address2 && `Address2: ${schedule.address2}. `}`
        + `City: ${schedule.city}. State: ${schedule.state}`}
      </p>
    )}
    {schedule.notes && (
      <p>{`Notes: ${schedule.notes}`}</p>
    )}
  </>
);

export default ScheduleRow;
