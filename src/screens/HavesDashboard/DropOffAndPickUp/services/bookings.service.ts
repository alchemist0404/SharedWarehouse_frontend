import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

const bookingsService = {
  fetchActiveBookings: ({ page, size }: IPageRequest) => callApi({
    method: 'GET',
    endpoint: 'booking/provided/active',
    queryParams: {
      page: page - 1,
      size
    }
  })
};

export default bookingsService;
