import _ from 'lodash';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { IFormValues } from '@screens/NeedsDashboard/DropOffAndPickUp/components/EditingSchedulesSegment/ScheduleSavingModal/ScheduleForm/index';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export const toUTCTime = (date, time) => {
  const scheduledTime = _.cloneDeep(date);
  const parsedTime = time.split(':');
  scheduledTime.setHours(+parsedTime[0], +parsedTime[1], 0, 0);
  return scheduledTime.toUTCString();
};

const clockFormat = (unit: number) => (unit < 10 ? `0${unit}` : unit);

export const scheduleToForm: (data: IScheduleResponseDto) => IFormValues = (
  { scheduledTime, ...data }
) => {
  const asDate = new Date(scheduledTime);
  return ({
    spaces: data.spaces.map(space => ({ spaceId: space.id, note: space.note })),
    city: data.city,
    address1: data.address1,
    address2: data.address2,
    notes: data.notes,
    state: data.state,
    status: data.status,
    type: data.type,
    allSpaces: false,
    time: `${clockFormat(asDate.getHours())}:${clockFormat(asDate.getMinutes())}`,
    date: asDate
  });
};

export const formToSchedule: (values: IFormValues) => IScheduleDto = values => ({
  state: values.state,
  city: values.city,
  address2: values.address2,
  address1: values.address1,
  type: values.type,
  spaces: values.spaces,
  scheduledTime: toUTCTime(values.date, values.time),
  notes: values.notes,
  status: values.status,
  id: undefined,
  bookingId: undefined,
  updatedAt: undefined,
  createdAt: undefined
});
