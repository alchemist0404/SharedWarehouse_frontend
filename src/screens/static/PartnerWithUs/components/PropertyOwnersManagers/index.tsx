import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import styles from '@screens/static/PartnerWithUs/containers/PartnerWithUsPage/styles.module.scss';

const PropertyOwnersManagers: React.FC = () => (
  <>
    <Container className={styles.text} text>
      <div>
        <h3 className={styles.tab_button}>Property Owners/Managers</h3>
        <div>
          <p>
            If you are a Property Owner or Manager with some idle/vacant spaces that you would like to list with
            Shared Spaces, but don’t have the time to manage all the details of a shared spaces solution, we can help.
          </p>
          <p>
            We are building a network of Shared Spaces Managed Solutions Partners that have tons of experience in
            logistics, warehouse space management, office space management, etc.
          </p>
          <p>
            The arrangement is simple: You provide the space, we provide the resources to set-up, and manage the space
            on an ongoing basis, we split the revenue. Everyone wins!
          </p>
        </div>
      </div>

    </Container>
    <div>
      <Button color="olive" className={styles.button}>LET’S PARTNER!</Button>
    </div>
  </>
);

export default PropertyOwnersManagers;
