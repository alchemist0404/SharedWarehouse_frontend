import { connect } from 'react-redux';
import {
  extractAvatar,
  extractLoadProfileDetailsLoading,
  extractProfileData,
  extractSaveProfileDetailsLoading,
  extractUploadAvatarLoading
} from '@screens/HavesDashboard/Account/reducers';
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/HavesDashboard/Account/routines';
import { Account } from '@screens/NeedsDashboard/Account/containers/AccountPage';

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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
