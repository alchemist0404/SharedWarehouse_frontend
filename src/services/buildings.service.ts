import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';

const buildingsService = {
  fetchOwnedBuildings: ({ page, size }: IPageRequest) => callApi({
    endpoint: 'buildings/owned',
    method: 'GET',
    queryParams: {
      page: page - 1,
      size
    }
  }),
  fetchBookedBuildings: ({ size, page }: IPageRequest) => callApi({
    method: 'GET',
    endpoint: 'buildings/booked',
    queryParams: {
      page: page - 1,
      size
    }
  }),
  createBuilding: (requestData: IBuildingForSave) => callApi({
    method: 'PUT',
    requestData,
    endpoint: 'buildings/create'
  })
};

export default buildingsService;
