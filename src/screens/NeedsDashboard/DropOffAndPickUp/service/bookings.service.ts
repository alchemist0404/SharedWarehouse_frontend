import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { callApi } from '@helpers/api.helper';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';

const bookingsService = {
  fetchActiveBookings: (page: IPageRequest) => callApi({
    method: 'GET',
    endpoint: 'booking/created/active',
    queryParams: {
      page: page.page - 1,
      size: page.size
    }
  }),
  cancelBooking: (requestData: IBookingCancellationRequest) => callApi({
    method: 'POST',
    endpoint: 'booking/cancel',
    requestData
  })
};

export default bookingsService;
