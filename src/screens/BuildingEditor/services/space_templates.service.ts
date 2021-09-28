import { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';
import { callApi } from '@helpers/api.helper';

const spaceTemplatesService = {
  createTemplate: (requestData: ISpaceTemplateModificationRequest) => callApi({
    endpoint: 'space_templates/create',
    method: 'PUT',
    requestData
  })
};

export default spaceTemplatesService;
