import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

export enum ScheduleStatus {
  PENDING='PENDING',
  ACCEPTED='ACCEPTED',
  COMPLETED='COMPLETED',
  REJECTED='REJECTED',
  CANCELLED='CANCELLED'
}

export const colorOfScheduleStatus: (status: ScheduleStatus) => SemanticCOLORS = status => {
  switch (ScheduleStatus[status] as any) {
    case ScheduleStatus.ACCEPTED:
      return 'teal';
    case ScheduleStatus.COMPLETED:
      return 'green';
    case ScheduleStatus.PENDING:
      return 'yellow';
    case ScheduleStatus.REJECTED:
      return 'red';
    case ScheduleStatus.CANCELLED:
      return 'grey';
    default:
      return undefined;
  }
};

export const iconOfScheduleStatus: (status: ScheduleStatus) => SemanticICONS = status => {
  switch (ScheduleStatus[status] as any) {
    case ScheduleStatus.ACCEPTED:
      return 'calendar alternate outline';
    case ScheduleStatus.COMPLETED:
      return 'calendar check outline';
    case ScheduleStatus.PENDING:
      return 'clock outline';
    case ScheduleStatus.REJECTED:
      return 'dont';
    case ScheduleStatus.CANCELLED:
      return 'cancel';
    default:
      return undefined;
  }
};
