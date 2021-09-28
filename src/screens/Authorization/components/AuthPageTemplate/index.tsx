import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import styles from './styles.module.scss';
import WarehouseBackground from '@screens/Authorization/components/WarehouseBackground';
import Parallax from 'parallax-js';
import HorizontalLogo from '@components/logos/HorizontalLetters';
import { Link } from 'react-router-dom';

const AuthPageTemplate: React.FC = ({ children }) => {
  useEffect(() => {
    const scene = document.getElementById('scene');
    const parallax = new Parallax(scene);
    return () => parallax.disable();
  }, []);

  return (
    <div className={styles.container}>
      <WarehouseBackground />
      <Segment className={styles.form_segment}>
        <div className={styles.form_container}>
          <>
            <Link to="/">
              <HorizontalLogo className={styles.logo} />
            </Link>
            {children}
          </>
        </div>
      </Segment>
    </div>
  );
};

export default AuthPageTemplate;
