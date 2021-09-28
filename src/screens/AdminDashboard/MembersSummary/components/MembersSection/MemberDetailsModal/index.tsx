import React, { useEffect, useState } from 'react';
import { Icon, Loader, Modal, ModalContent } from 'semantic-ui-react';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';
import AccountDetailsForm from '@screens/NeedsDashboard/Account/components/AccountDetailsForm';
import { profileDataToForm } from '@screens/NeedsDashboard/Account/containers/AccountPage';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';
import { IMemberProfile } from '@screens/AdminDashboard/MembersSummary/model/IMemberProfile';
import MemberCard from '@screens/AdminDashboard/MembersSummary/components/MembersSection/MemberCard';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import classNames from 'classnames';

export interface IMemberDetailsModalProps {
  memberDetails?: IMemberProfile;
  hideMemberDetails: IBindingCallback1<void>;
  memberDetailsLoading: boolean;
  saveMemberProfile: IBindingCallback1<IProfileData>;
  saveMemberProfileLoading: boolean;
}

const MemberDetailsModal: React.FC<IMemberDetailsModalProps> = (
  { memberDetails, hideMemberDetails, memberDetailsLoading,
    saveMemberProfile, saveMemberProfileLoading }
) => {
  const isNew = !memberDetails?.id;
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    setEditing(isNew);
  }, [setEditing, isNew, memberDetails]);

  return (
    <Modal open={!!memberDetails || memberDetailsLoading} onClose={() => hideMemberDetails()} closeIcon>
      <ModalContent className={classNames(common.container, styles.wrapper)}>
        {memberDetailsLoading
          ? (
            <Loader className={styles.loader} active size="large" inline="centered" />
          )
          : (
            <>
              <div className={styles.header}>
                <h1>Member details</h1>
                {!isNew && (
                  <div className={styles.edit} onClick={() => setEditing(!editing)}>
                    <Icon name={editing ? 'undo' : 'edit outline'} />
                    {editing ? 'Cancel' : 'Edit'}
                  </div>
                )}
              </div>
              {editing
                ? (
                  <AccountDetailsForm
                    saveChanges={saveMemberProfile}
                    savingLoading={saveMemberProfileLoading}
                    initialValuesLoading={memberDetailsLoading}
                    initialFormData={profileDataToForm(memberDetails)}
                  />
                )
                : (
                  <MemberCard member={memberDetails} />
                )}
            </>
          )}
      </ModalContent>
    </Modal>
  );
};

export default MemberDetailsModal;
