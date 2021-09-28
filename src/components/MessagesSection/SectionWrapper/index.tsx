import React from 'react';
import { IWrapperProps } from '@components/InformationSection';
import { Link } from 'react-router-dom';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';
import { Button, Segment, SegmentGroup } from 'semantic-ui-react';
import styles from './styles.module.scss';

export type ISectionWrapperProps = IWrapperProps

const MessagesSectionWrapper: React.FC<ISectionWrapperProps> = ({ children }) => (
  <SegmentGroup>
    <Segment className={styles.navbar}>
      <Link to={HAVES_DASHBOARD_ENDPOINTS.MESSAGES} className={styles.link}>Go to message center</Link>
      <div className={styles.filler} />
      <Button className={styles.button} size="huge" icon="envelope open outline" />
      <Button className={styles.button} size="huge" icon="trash alternate outline" />
    </Segment>
    <Segment className={styles.content}>
      {children}
    </Segment>
  </SegmentGroup>
);

export default MessagesSectionWrapper;
