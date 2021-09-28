import { callApi } from '@helpers/api.helper';

const tagsService = {
  fetchAllTags: () => callApi({
    endpoint: 'tags',
    method: 'GET'
  })
};

export default tagsService;
