import { callApi } from '@helpers/api.helper';
import { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';

const templatesService = {
  fetchSpaceTemplateDetails: (id: string) => callApi({
    method: 'GET',
    endpoint: `space_templates/${id}`
  }),
  updateSpaceTemplate: (id: string, data: ISpaceTemplateModificationRequest) => callApi({
    method: 'PATCH',
    endpoint: `space_templates/edit/${id}`,
    requestData: data
  })
};

export default templatesService;
