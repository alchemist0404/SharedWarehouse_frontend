import { callApi } from '@helpers/api.helper';
import { IFetchTransactionsForBookingRequest } from '@screens/BookingCheckout/containers/BookingDetailsPage/TransactionsBlock';

const bookingTransactionsService = {
  fetchBookingTransactions: (
    { bookingId, pageRequest: { size, page } }: IFetchTransactionsForBookingRequest
  ) => callApi({
    method: 'GET',
    endpoint: `transactions/booking/${bookingId}`,
    queryParams: {
      page: page - 1,
      size
    }
  })
};

export default bookingTransactionsService;
