import { IQueryData } from '@screens/BrowseSpaces/model/QueryData';
import { callApi } from '@helpers/api.helper';

export const loadSpaces = async (query: IQueryData) => callApi({
  endpoint: '/api/buildings/search',
  method: 'POST',
  requestData: {
    ...query,
    page: query.page - 1
  } as IQueryData
});
