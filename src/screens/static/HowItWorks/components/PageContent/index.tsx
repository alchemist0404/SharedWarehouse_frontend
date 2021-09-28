import React from 'react';
import styles from '@screens/static/HowItWorks/containers/HowItWorksPage/styles.module.scss';
import { Container } from 'semantic-ui-react';
import SeekingSpace from '@screens/static/HowItWorks/components/SeekingSpace';
import OfferingSpace from '@screens/static/HowItWorks/components/OfferingSpace';
import common from '@screens/static/common.module.scss';
import Tabs from '@components/Tabs';

export interface IHowItWorksContentProps {
  title?: string;
}

const HowItWorksContent: React.FC<IHowItWorksContentProps> = ({ title = 'Learn the process' }) => (
  <div className={common.container}>
    <div className={styles.centered}>
      <h1>{title}</h1>
      <h2>Get the nitty gritty details here:</h2>
    </div>
    <Tabs
      content={[
        {
          key: 1,
          name: 'Seeking Space',
          element: {
            Element: SeekingSpace
          }
        },
        {
          key: 2,
          name: 'Offering Space',
          element: {
            Element: OfferingSpace
          }
        }
      ]}
      wrapper={{
        Element: Container,
        props: {
          text: true,
          className: styles.text
        }
      }}
    />
  </div>
);

export default HowItWorksContent;
