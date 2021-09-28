import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { membersSummaryReducer } from '@screens/AdminDashboard/MembersSummary/containers/MembersSummaryPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  hideMemberDetailsRoutine,
  resetMemberDetailsRoutine,
  saveMemberProfileRoutine,
  fetchMemberDetailsRoutine,
  setPageRoutine,
  fetchMembersRoutine
} from '@screens/AdminDashboard/MembersSummary/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  hideMemberDetailsRequest: reducerCreator([hideMemberDetailsRoutine.TRIGGER]),
  resetMemberDetailsRequest: reducerCreator([resetMemberDetailsRoutine.TRIGGER]),
  saveMemberProfileRequest: reducerCreator([saveMemberProfileRoutine.TRIGGER]),
  fetchMemberDetailsRequest: reducerCreator([fetchMemberDetailsRoutine.TRIGGER]),
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  fetchMembersRoutineRequest: reducerCreator([fetchMembersRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: membersSummaryReducer
});

const reqs = (state: RootState) => state.adminDashboard.membersSummary.requests;
const data = (state: RootState) => state.adminDashboard.membersSummary.data;

export const extractMembers = state => data(state).list.items;
export const extractTotalPages = state => data(state).list.totalPages;
export const extractTotalResults = state => data(state).list.totalResults;
export const extractCurrentPage = state => data(state).list.page;
export const extractCurrentSize = state => data(state).list.pageSize;
export const extractMemberDetails = state => data(state).details;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractRemoveMemberDetailsLoading = state => reqs(state).hideMemberDetailsRequest.loading;
export const extractRemoveMemberDetailsError = state => reqs(state).hideMemberDetailsRequest.error;
export const extractResetMemberDetailsLoading = state => reqs(state).resetMemberDetailsRequest.loading;
export const extractResetMemberDetailsError = state => reqs(state).resetMemberDetailsRequest.error;
export const extractSaveMemberProfileLoading = state => reqs(state).saveMemberProfileRequest.loading;
export const extractSaveMemberProfileError = state => reqs(state).saveMemberProfileRequest.error;
export const extractFetchMemberDetailsLoading = state => reqs(state).fetchMemberDetailsRequest.loading;
export const extractFetchMemberDetailsError = state => reqs(state).fetchMemberDetailsRequest.error;
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractFetchMembersLoading = state => reqs(state).fetchMembersRoutineRequest.loading;
export const extractFetchMembersError = state => reqs(state).fetchMembersRoutineRequest.error;
