import React, { useEffect } from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { connect } from 'react-redux';
import AccountDetailsForm, {
  IAccountDetailsFormProps,
  IFormValues
} from '@screens/NeedsDashboard/Account/components/AccountDetailsForm';
import styles from './styles.module.scss';
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/NeedsDashboard/Account/routines';
import {
  extractAvatar,
  extractLoadProfileDetailsLoading,
  extractProfileData,
  extractSaveProfileDetailsLoading,
  extractUploadAvatarLoading
} from '@screens/NeedsDashboard/Account/reducers';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import AvatarEditorForm from '@screens/NeedsDashboard/Account/components/AvatarEditorForm';
import { Divider } from 'semantic-ui-react';
import noAvatar from '@images/no_avatar.webp';
import { RouteComponentProps, withRouter } from 'react-router';

export interface IAccountProps extends IAccountDetailsFormProps {
  profileData: IProfileData;
  loadDetails: IBindingAction;
  profileDataLoading: boolean;
  uploadAvatar: IBindingCallback1<Blob>;
  avatarUploading: boolean;
  avatarSrc: string;
}

export const profileDataToForm = (value: IProfileData): IFormValues => ({
  ...value,
  ...value?.location
});

export interface IAccountLocationState {
  autoFocusInputName?: string;
}

const Account: React.FC<IAccountProps & RouteComponentProps> = (
  {
    loadDetails, saveChanges, savingLoading, profileData, profileDataLoading,
    uploadAvatar, avatarUploading, avatarSrc, history
  }
) => {
  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const locationState: IAccountLocationState | undefined = history.location.state;
  const autoFocusInputName = locationState?.autoFocusInputName;

  return (
    <div className={common.container}>
      <h1>Account Details</h1>
      <h2>General information</h2>
      <Divider />
      <AvatarEditorForm
        uploadImage={uploadAvatar}
        existingAvatarSrc={avatarSrc || noAvatar}
        loading={avatarUploading}
      />
      <AccountDetailsForm
        initialValuesLoading={profileDataLoading}
        initialFormData={profileDataToForm(profileData)}
        className={styles.form}
        savingLoading={savingLoading}
        saveChanges={saveChanges}
        autoFocusInputName={autoFocusInputName}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  savingLoading: extractSaveProfileDetailsLoading(state),
  profileData: extractProfileData(state),
  profileDataLoading: extractLoadProfileDetailsLoading(state),
  avatarUploading: extractUploadAvatarLoading(state),
  avatarSrc: extractAvatar(state)
});

const mapDispatchToProps = {
  loadDetails: loadProfileDetailsRoutine,
  saveChanges: saveProfileDetailsRoutine,
  uploadAvatar: uploadAvatarRoutine
};

export { Account };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
