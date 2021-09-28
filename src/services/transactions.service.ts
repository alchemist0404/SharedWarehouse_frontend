import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

const transactionsService = {
  fetchTransactions: ({ page, size }: IPageRequest) => callApi({
    endpoint: 'transactions',
    method: 'GET',
    queryParams: {
      page: page - 1,
      size
    }
  })
};

export default transactionsService;
