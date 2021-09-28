import React from 'react';
import { Label, LabelGroup } from 'semantic-ui-react';
import styles from '../styles.module.scss';
import moment from 'moment';
import { colorOfScheduleStatus, iconOfScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import { colorOfScheduleType, iconOfScheduleType, ScheduleType } from '@models/domain/schedule/ScheduleType';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IExistingScheduleInfoProps {
  formValues: IScheduleResponseDto;
}

const ExistingScheduleInfo: React.FC<IExistingScheduleInfoProps> = ({ formValues: values }) => (
  <>
    <LabelGroup>
      <span className={styles.label}>Appointed time:&nbsp;</span>
      <Label content={moment(values.scheduledTime).format('LLL')} />
    </LabelGroup>
    <LabelGroup>
      <span className={styles.label}>Status:&nbsp;</span>
      <Label
        color={colorOfScheduleStatus(values.status)}
        content={values.status}
        icon={iconOfScheduleStatus(values.status)}
      />
    </LabelGroup>
    <LabelGroup>
      <span className={styles.label}>Schedule type:&nbsp;</span>
      <Label
        color={colorOfScheduleType(values.type)}
        content={ScheduleType[values.type]}
        icon={iconOfScheduleType(values.type)}
      />
    </LabelGroup>
    <pre>
      {JSON.stringify(values.spaces, null, 2)}
    </pre>
  </>
);

export default ExistingScheduleInfo;
