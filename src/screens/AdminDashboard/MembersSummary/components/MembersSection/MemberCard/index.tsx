import React from 'react';
import { IMemberProfile } from '@screens/AdminDashboard/MembersSummary/model/IMemberProfile';
import styles from './styles.module.scss';
import { Divider, Grid, GridColumn, GridRow, Image } from 'semantic-ui-react';
import MemberCardProperty from '@screens/AdminDashboard/MembersSummary/components/MembersSection/MemberCardProperty';
import noAvatar from '@images/no_avatar.webp';

interface IMemberCardProps {
  member?: IMemberProfile;
}

const MemberCard: React.FC<IMemberCardProps> = ({ member }) => (
  <div className={styles.wrapper}>
    <Grid>
      <GridRow columns={2}>
        <GridColumn className={styles.avatarWrapper}>
          <Image className={styles.avatar} src={member.avatar || noAvatar} circular />
        </GridColumn>
        <GridColumn>
          <MemberCardProperty title="First Name" value={member.firstName} className={styles.paddingProperty} />
          <MemberCardProperty title="Last Name" value={member.lastName} className={styles.paddingProperty} />
          <MemberCardProperty title="Phone Number" value={member.phone} className={styles.paddingProperty} />
        </GridColumn>
      </GridRow>
      <GridRow columns={2}>
        <GridColumn>
          <MemberCardProperty title="Email" value={member.email} />
        </GridColumn>
        <GridColumn>
          <MemberCardProperty title="Company Name" value={member.companyName} />
        </GridColumn>
      </GridRow>
      <h2>Address</h2>
      <Divider className={styles.divider} />
      <GridRow columns={2}>
        <GridColumn>
          <MemberCardProperty title="Address1" value={member.location?.address1} />
        </GridColumn>
        <GridColumn>
          <MemberCardProperty title="Address2" value={member.location?.address2} />
        </GridColumn>
      </GridRow>
      <GridRow columns={2}>
        <GridColumn>
          <MemberCardProperty title="City" value={member.location?.city} />
        </GridColumn>
        <GridColumn>
          <MemberCardProperty title="State" value={member.location?.state} />
        </GridColumn>
      </GridRow>
      <GridRow columns={2}>
        <GridColumn>
          <MemberCardProperty title="ZIP" value={member.location?.zip} />
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
);

export default MemberCard;
