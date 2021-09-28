import { callApi } from '@helpers/api.helper';

const favoritesService = {
  toggleFavoriteBuilding: (id: string) => callApi({
    endpoint: `favorite/building/${id}`,
    method: 'PUT'
  })
};

export default favoritesService;
