import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import styles from '@screens/static/PartnerWithUs/containers/PartnerWithUsPage/styles.module.scss';

const WarehouseLogisticsOfficeSpaceManagement: React.FC = () => (
  <>
    <Container className={styles.text} text>
      <h3 className={styles.tab_button}>Warehouse/Logistics and Office Space Management Experts</h3>
      <div>
        <p>
          So you are an expert in warehouse management and logistics, and have a desire to share your skills by
          helping others manage their idle warehouse spaces.
        </p>
        <p>
          Or...
        </p>
        <p>
          You have expertise in office space allocation and management, and have the bandwith to help others manage
          their idle office spaces.
        </p>
        <p>
          If you have the skills, talent, and desire to help others, apply to join our Shared Spaces Managed
          Solutions Partners network, and get ready to work!
        </p>
      </div>
    </Container>
    <div>
      <Button color="olive" className={styles.button}>I’M AN EXPERT!</Button>
    </div>
  </>
);

export default WarehouseLogisticsOfficeSpaceManagement;
