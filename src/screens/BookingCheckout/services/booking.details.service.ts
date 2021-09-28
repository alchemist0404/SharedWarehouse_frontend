import { callApi } from '@helpers/api.helper';

const bookingDetailsService = {
  fetchBookingDetails: (id: string) => callApi({
    endpoint: `booking/${id}`,
    method: 'GET'
  })
};

export default bookingDetailsService;
