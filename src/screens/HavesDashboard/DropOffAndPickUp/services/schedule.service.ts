import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import { callApi } from '@helpers/api.helper';
import { fetchSchedules } from '@screens/NeedsDashboard/DropOffAndPickUp/service/schedules.service';

const schedulesService = {
  reviewSchedule: (requestData: IScheduleReviewRequest) => callApi({
    method: 'PUT',
    endpoint: 'schedules',
    requestData
  }),
  completeSchedule: (scheduleId: string) => callApi({
    method: 'POST',
    endpoint: `schedules/complete/${scheduleId}`
  }),
  fetchSchedules
};

export default schedulesService;
