import { Role } from '@screens/Authorization/models/Roles';
import { callApi } from '@helpers/api.helper';

export const selectRoles = async (roles: Role[]) => callApi({
  endpoint: '/api/user/select_roles',
  method: 'PUT',
  requestData: { roles }
});
