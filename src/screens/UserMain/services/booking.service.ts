import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

export const fetchBookings = async (request: IPageRequest) => callApi({
  endpoint: 'booking',
  method: 'GET',
  queryParams: {
    page: request.page - 1,
    size: request.size
  }
});
