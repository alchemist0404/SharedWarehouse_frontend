import React from 'react';
import styles from '@screens/static/JoinOurTeam/containers/JoinOurTeamPage/styles.module.scss';
import { Container, Divider } from 'semantic-ui-react';
import common from '@screens/static/common.module.scss';
import JoinOurTeamForm from '@screens/static/JoinOurTeam/components/JoinOurTeamForm';

export interface IHowItWorksContentProps {
  title?: string;
}

const JoinOurTeamContent: React.FC<IHowItWorksContentProps> = ({ title = 'Join Our Team' }) => (
  <div className={common.container}>
    <div className={styles.centered}>
      <h1>{title}</h1>
      <h2>Do you have what it takes to help Shared Spaces succeed?</h2>
    </div>
    <Container className={styles.text} text>
      <div>
        <p>
          We are a rapidly growing company, and are always looking for exceptional talent in a
          <br />
          variety of functional areas.
          <br />
          Drop us a line here, and tell us how you can add value to Shared Spaces
        </p>
      </div>
      <Divider />
      <JoinOurTeamForm />
    </Container>
  </div>
);

export default JoinOurTeamContent;
