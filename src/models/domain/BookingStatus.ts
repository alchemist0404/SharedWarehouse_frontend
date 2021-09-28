import { SemanticCOLORS } from 'semantic-ui-react';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED'
}

export const colorOfStatus: (status: BookingStatus) => SemanticCOLORS = status => {
  switch (status) {
    case BookingStatus.CANCELLED:
      return 'red';
    case BookingStatus.CONFIRMED:
      return 'green';
    case BookingStatus.PENDING:
      return 'yellow';
    case BookingStatus.FINISHED:
      return 'teal';
    default:
      return undefined;
  }
};
