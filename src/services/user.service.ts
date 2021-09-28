import { callApi } from '@helpers/api.helper';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';
import { IMemberUpdateProfile } from '@screens/AdminDashboard/MembersSummary/model/IMemberUpdateProfile';

const userService = {
  fetchMembers: ({ page, size }: IPageRequest) => callApi({
    endpoint: 'user/members/summary',
    method: 'GET',
    queryParams: {
      page: page - 1,
      size
    }
  }),
  fetchMemberById: (id: string) => callApi({
    endpoint: `user/members/${id}/profile`,
    method: 'GET'
  }),
  updateMemberProfile: ({ id, data }: IMemberUpdateProfile) => callApi({
    endpoint: `user/members/${id}/profile/update`,
    method: 'POST',
    requestData: data
  }),
  createMemberProfile: (requestData: IProfileData) => callApi({
    endpoint: 'user/members/profile/create',
    method: 'POST',
    requestData
  })
};

export default userService;
