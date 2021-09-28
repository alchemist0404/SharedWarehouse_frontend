import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

export const fetchBuilding = async ({ id, from, to }) => callApi({
  endpoint: `/api/buildings/${id}`,
  method: 'POST',
  requestData: { from, to }
});

export const fetchSpaceAvailability = async (requestData: IPageRequest) => callApi({
  endpoint: '/api/spaces/availability',
  method: 'POST',
  requestData
});
