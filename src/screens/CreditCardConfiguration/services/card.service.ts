import { callApi } from '@helpers/api.helper';

const cardRequest = pmId => ({ paymentMethodId: pmId });

const creditCardService = {
  getCards: () => callApi({
    method: 'GET',
    endpoint: '/stripe/cards'
  }),
  addNewCard: (pmId: string) => callApi({
    method: 'PUT',
    endpoint: '/stripe/card/add',
    requestData: cardRequest(pmId)
  }),
  setDefault: (pmId: string) => callApi({
    method: 'PUT',
    endpoint: 'stripe/card/default',
    requestData: cardRequest(pmId)
  }),
  removeCard: (pmId: string) => callApi({
    method: 'DELETE',
    endpoint: 'stripe/card/remove',
    requestData: cardRequest(pmId)
  })
};

export default creditCardService;
