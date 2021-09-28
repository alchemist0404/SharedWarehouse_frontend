import { callApi } from '@helpers/api.helper';
import { ISpaceIdsWithScheduleId } from '../model/SpaceIdsWithScheduleId';

const spacesService = {
  fetchAvailableAndScheduledSpaces: (scheduleId: string) => callApi({
    method: 'GET',
    endpoint: `spaces/${scheduleId}`
  }),
  updateScheduleWithNewSpaces: ({ spacesIds, scheduleId }: ISpaceIdsWithScheduleId) => callApi({
    method: 'POST',
    endpoint: `spaces/${scheduleId}`,
    requestData: spacesIds
  })
};

export default spacesService;
