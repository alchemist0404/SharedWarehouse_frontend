import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

export enum ScheduleType {
  DROP_OFF = 'Drop off',
  PICK_UP = 'Pick up'
}

export const colorOfScheduleType: (type: ScheduleType) => SemanticCOLORS = type => {
  switch (ScheduleType[type]) {
    case ScheduleType.DROP_OFF:
      return 'blue';
    case ScheduleType.PICK_UP:
      return 'violet';
    default:
      return undefined;
  }
};

export const iconOfScheduleType: (type: ScheduleType) => SemanticICONS = type => {
  switch (ScheduleType[type]) {
    case ScheduleType.DROP_OFF:
      return 'arrow down';
    case ScheduleType.PICK_UP:
      return 'arrow up';
    default:
      return undefined;
  }
};

export const scheduleTypeOptions = Object.keys(ScheduleType)
  .map(type => ({
    key: type,
    value: type,
    text: ScheduleType[type]
  }));

export const schTypeKey = val => Object.keys(ScheduleType).filter(k => ScheduleType[k] === val)[0];
