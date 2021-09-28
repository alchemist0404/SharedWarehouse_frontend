import { callApi } from '@helpers/api.helper';
import { ISpaceUpdateDto } from '@screens/SpaceEditor/models/ISpaceUpdateDto';
import { ISpaceCreateDto } from '@screens/SpaceEditor/models/ISpaceCreateDto';

const spacesService = {
  fetchSpacesBySpaceTemplate: (spaceTemplateId: string) => callApi({
    method: 'GET',
    endpoint: `spaces/space_template/${spaceTemplateId}`
  }),
  updateSpace: (requestData: ISpaceUpdateDto) => callApi({
    method: 'PUT',
    endpoint: 'spaces',
    requestData
  }),
  createSpace: (requestData: ISpaceCreateDto) => callApi({
    method: 'POST',
    endpoint: 'spaces',
    requestData
  })
};

export default spacesService;
