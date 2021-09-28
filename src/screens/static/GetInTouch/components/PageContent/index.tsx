import React from 'react';
import styles from '@screens/static/GetInTouch/containers/GetInTouchPage/styles.module.scss';
import { Container } from 'semantic-ui-react';
import common from '@screens/static/common.module.scss';
import GetInTouchForm from '@screens/static/GetInTouch/components/GetInTouchForm';

export interface IHowItWorksContentProps {
  title?: string;
}

const GetInTouchContent: React.FC<IHowItWorksContentProps> = ({ title = 'Get  in Touch' }) => (
  <div className={common.container}>
    <div className={styles.centered}>
      <h1>{title}</h1>
      <h2>Drop us a line, we’d love to hear from you.</h2>
    </div>
    <Container className={styles.text} text>
      <GetInTouchForm />
    </Container>
  </div>
);

export default GetInTouchContent;
