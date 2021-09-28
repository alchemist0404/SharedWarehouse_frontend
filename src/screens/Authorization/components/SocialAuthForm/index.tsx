import React from 'react';
import styles from '@screens/Authorization/components/SocialAuthForm/styles.module.scss';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '@screens/Authorization/constants';
import { Button } from 'semantic-ui-react';

const SocialAuthForm: React.FC = () => {
  const handleGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleFacebook = () => {
    window.location.href = FACEBOOK_AUTH_URL;
  };

  return (
    <div className={styles.socials_container}>
      <Button
        basic
        className={styles.socials_button_google}
        type="button"
        icon="google"
        content="Continue with Google"
        color="black"
        onClick={handleGoogle}
      />
      <Button
        basic
        className={styles.socials_button_facebook}
        type="button"
        icon="facebook official"
        content="Continue with Facebook"
        color="black"
        onClick={handleFacebook}
      />
    </div>
  );
};

export default SocialAuthForm;
