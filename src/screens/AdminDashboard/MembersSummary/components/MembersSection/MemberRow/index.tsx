import React from 'react';
import styles from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection/styles.module.scss';
import { Image, TableCell, TableRow } from 'semantic-ui-react';
import { IMemberShort } from '@screens/AdminDashboard/MembersSummary/model/IMemberShort';
import noAvatar from '@images/no_avatar.webp';

interface IMemberRowProps {
  member: IMemberShort;
  onClick: () => void;
}

const MemberRow: React.FC<IMemberRowProps> = ({ member, onClick }) => (
  <TableRow key={member.id} className={styles.row} onClick={onClick}>
    <TableCell>
      <Image className={styles.avatar_image} src={member.avatar || noAvatar} circular />
    </TableCell>
    <TableCell className={styles.ellipsis} verticalAlign="middle">
      {`${member.firstName || ''} ${member.lastName || ''}`}
    </TableCell>
    <TableCell className={styles.ellipsis} verticalAlign="middle">
      {member.email}
    </TableCell>
    <TableCell className={styles.ellipsis} verticalAlign="middle">
      {member.roles.length ? member.roles[0] : ''}
    </TableCell>
  </TableRow>
);

export default MemberRow;
