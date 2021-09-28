/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createMembersSummaryRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`ADMIN_DASHBOARD__MEMBERS_SUMMARY:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const hideMemberDetailsRoutine = createMembersSummaryRoutine('HIDE_MEMBER_DETAILS');
export const resetMemberDetailsRoutine = createMembersSummaryRoutine('RESET_MEMBER_DETAILS');
export const saveMemberProfileRoutine = createMembersSummaryRoutine('SAVE_MEMBER_PROFILE');
export const fetchMemberDetailsRoutine = createMembersSummaryRoutine('FETCH_MEMBER_DETAILS');
export const setPageRoutine = createMembersSummaryRoutine('SET_PAGE');
export const fetchMembersRoutine = createMembersSummaryRoutine('FETCH_MEMBERS');
