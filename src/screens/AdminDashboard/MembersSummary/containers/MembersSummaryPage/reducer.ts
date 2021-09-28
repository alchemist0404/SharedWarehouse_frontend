import { createReducer } from '@reduxjs/toolkit';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { IMemberShort } from '@screens/AdminDashboard/MembersSummary/model/IMemberShort';
import {
  fetchMemberDetailsRoutine,
  fetchMembersRoutine, hideMemberDetailsRoutine, resetMemberDetailsRoutine, saveMemberProfileRoutine,
  setPageRoutine
} from '@screens/AdminDashboard/MembersSummary/routines';

const initialState = {
  list: getInitialPageableState<IMemberShort>(),
  details: undefined
};

export const membersSummaryReducer = createReducer(initialState, {
  [fetchMembersRoutine.SUCCESS]: (state, { payload }) => {
    state.list.items = payload.items;
    state.list.totalResults = payload.totalResults;
    state.list.totalPages = payload.totalPages;
  },
  [fetchMemberDetailsRoutine.SUCCESS]: (state, { payload }) => {
    state.details = payload;
  },
  [saveMemberProfileRoutine.SUCCESS]: (state, { payload }) => {
    state.details = payload;
  },
  [resetMemberDetailsRoutine.FULFILL]: state => {
    state.details = {};
  },
  [hideMemberDetailsRoutine.FULFILL]: state => {
    state.details = undefined;
  },
  [setPageRoutine.FULFILL]: (state, { payload }) => {
    state.list.page = payload;
  }
});
