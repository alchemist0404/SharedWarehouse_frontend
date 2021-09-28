import React, { useEffect } from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { connect } from 'react-redux';
import MembersSection from '@screens/AdminDashboard/MembersSummary/components/MembersSection';
import {
  extractFetchMembersLoading,
  extractMembers,
  extractCurrentPage,
  extractCurrentSize,
  extractTotalResults,
  extractTotalPages,
  extractFetchMemberDetailsLoading,
  extractMemberDetails,
  extractSaveMemberProfileLoading
} from '@screens/AdminDashboard/MembersSummary/reducers';
import {
  fetchMemberDetailsRoutine,
  fetchMembersRoutine, resetMemberDetailsRoutine,
  setPageRoutine, saveMemberProfileRoutine, hideMemberDetailsRoutine
} from '@screens/AdminDashboard/MembersSummary/routines';
import { IPageable } from '@models/domain/PageableReducerState';
import { IBindingCallback1 } from '@models/Callbacks';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IMemberShort } from '@screens/AdminDashboard/MembersSummary/model/IMemberShort';
import Pagination from '@components/Pagination';
import { IMemberProfile } from '@screens/AdminDashboard/MembersSummary/model/IMemberProfile';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';

export interface IMembersSummaryProps extends IPageable {
  members: IMemberShort[];
  memberDetails?: IMemberProfile;
  resetMemberDetails: IBindingCallback1<void>;
  hideMemberDetails: IBindingCallback1<void>;
  fetchMembers: IBindingCallback1<IPageRequest>;
  fetchMemberDetails: IBindingCallback1<string>;
  saveMemberProfile: IBindingCallback1<IProfileData>;
  memberDetailsLoading: boolean;
  saveMemberProfileLoading: boolean;
  membersLoading: boolean;
  setPage: IBindingCallback1<number>;
}

const MembersSummary: React.FC<IMembersSummaryProps> = (
  { members, fetchMembers, membersLoading, setPage, pageSize, page, totalPages,
    memberDetails, fetchMemberDetails, memberDetailsLoading, saveMemberProfile, saveMemberProfileLoading,
    resetMemberDetails, hideMemberDetails }
) => {
  useEffect(() => {
    if (fetchMembers) {
      fetchMembers({ size: pageSize, page });
    }
  }, [fetchMembers, page, pageSize]);

  return (
    <div className={common.container}>
      <h1>Members</h1>
      <MembersSection
        items={members}
        fetchItems={() => null}
        itemsLoading={membersLoading}
        fetchMemberDetails={fetchMemberDetails}
        memberDetails={memberDetails}
        memberDetailsLoading={memberDetailsLoading}
        saveMemberProfile={saveMemberProfile}
        saveMemberProfileLoading={saveMemberProfileLoading}
        resetMemberDetails={resetMemberDetails}
        hideMemberDetails={hideMemberDetails}
      />
      {!membersLoading && totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  members: extractMembers(state),
  memberDetails: extractMemberDetails(state),
  membersLoading: extractFetchMembersLoading(state),
  memberDetailsLoading: extractFetchMemberDetailsLoading(state),
  saveMemberProfileLoading: extractSaveMemberProfileLoading(state),
  totalResults: extractTotalResults(state),
  totalPages: extractTotalPages(state),
  page: extractCurrentPage(state),
  pageSize: extractCurrentSize(state)
});

const mapDispatchToProps = {
  saveMemberProfile: saveMemberProfileRoutine,
  fetchMembers: fetchMembersRoutine,
  fetchMemberDetails: fetchMemberDetailsRoutine,
  setPage: setPageRoutine.fulfill,
  resetMemberDetails: resetMemberDetailsRoutine.fulfill,
  hideMemberDetails: hideMemberDetailsRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersSummary);
