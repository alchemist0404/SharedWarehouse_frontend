import React, { useCallback } from 'react';
import { Button, TableCell, TableRow } from 'semantic-ui-react';
import { IInformationSectionProps, InformationSection } from '@components/InformationSection';
import _ from 'lodash';
import { IMemberShort } from '@screens/AdminDashboard/MembersSummary/model/IMemberShort';
import MemberRow from '@screens/AdminDashboard/MembersSummary/components/MembersSection/MemberRow';
import MembersTableHeader from '@screens/AdminDashboard/MembersSummary/components/MembersSection/MembersTableHeader';
import MemberDetailsModal from '@screens/AdminDashboard/MembersSummary/components/MembersSection/MemberDetailsModal';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';
import { IMemberProfile } from '@screens/AdminDashboard/MembersSummary/model/IMemberProfile';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';

interface IMembersSectionProps extends IInformationSectionProps<IMemberShort> {
  fetchMemberDetails: IBindingCallback1<string>;
  resetMemberDetails: IBindingCallback1<void>;
  hideMemberDetails: IBindingCallback1<void>;
  memberDetails?: IMemberProfile;
  memberDetailsLoading: boolean;
  saveMemberProfile: IBindingCallback1<IProfileData>;
  saveMemberProfileLoading: boolean;
}

const MembersSection: React.FC<IMembersSectionProps> = (
  {
    title = 'Shared Spaces Members',
    fetchMemberDetails,
    resetMemberDetails,
    hideMemberDetails,
    memberDetails,
    memberDetailsLoading,
    saveMemberProfileLoading,
    saveMemberProfile,
    ...props
  }
) => {
  const memberToItem = useCallback((member: IMemberShort) => (
    <MemberRow key={member.id} member={member} onClick={() => fetchMemberDetails(member.id)} />
  ), [fetchMemberDetails]);

  return (
    <>
      <MemberDetailsModal
        memberDetails={memberDetails}
        memberDetailsLoading={memberDetailsLoading}
        saveMemberProfile={saveMemberProfile}
        saveMemberProfileLoading={saveMemberProfileLoading}
        hideMemberDetails={hideMemberDetails}
      />
      <div className={styles.subtitleWrapper}>
        <h2 className={styles.subtitle}>{title}</h2>
        <div className={styles.addButton}>
          <Button
            color="orange"
            content="Add new"
            icon="plus"
            onClick={() => resetMemberDetails()}
          />
        </div>
      </div>
      <InformationSection
        {...props}
        hideTitle
        renderItem={memberToItem}
        itemsWrapper={MembersTableHeader}
        noItemsPlaceholder={() => (
          <TableRow>
            <TableCell>No items</TableCell>
            {_.times(3).map(i => <TableCell key={i} />)}
          </TableRow>
        )}
      />
    </>
  );
};

export default MembersSection;
