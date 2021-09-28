import { callApi } from '@helpers/api.helper';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';

const profileService = {
  uploadAvatar: (formData: FormData) => callApi({
    method: 'POST',
    endpoint: 'user/profile/avatar',
    formData
  }),
  loadProfileData: () => callApi({
    method: 'GET',
    endpoint: 'user/profile'
  }),
  saveProfileData: (requestData: IProfileData) => callApi({
    method: 'POST',
    endpoint: 'user/profile/update',
    requestData
  })
};

export default profileService;
