import { callApi } from '@helpers/api.helper';

export const fetchFavoriteBuildings = ({ page, size }) => callApi({
  method: 'GET',
  endpoint: 'buildings/favorite',
  queryParams: {
    page: page - 1,
    size
  }
});
