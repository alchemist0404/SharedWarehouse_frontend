import { callApi } from '@helpers/api.helper';

const bookingPaymentService = {
  fetchPaymentRequirements: (bookingId: string) => callApi({
    endpoint: `booking/${bookingId}/payment_requirements`,
    method: 'GET'
  })
};

export default bookingPaymentService;
