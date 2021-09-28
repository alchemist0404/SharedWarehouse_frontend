import { callApi } from '@helpers/api.helper';
import { IScheduleDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';

export const fetchSchedules = bookingId => callApi({
  method: 'GET',
  endpoint: `schedules/${bookingId}`
});

export const saveSchedule = (schedule: IScheduleDto) => callApi({
  method: 'POST',
  endpoint: 'schedules',
  requestData: schedule
});

export const cancelSchedule = (scheduleId: string) => callApi({
  method: 'POST',
  endpoint: `schedules/${scheduleId}`
});
