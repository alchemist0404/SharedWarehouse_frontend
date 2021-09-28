import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { IWrapperProps } from '@components/InformationSection';

const MembersTableHeader: React.FC<IWrapperProps> = ({ haveMore, children }) => (
  <Table selectable singleLine padded attached={haveMore ? 'top' : undefined}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Profile Pic</TableHeaderCell>
        <TableHeaderCell>Member Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Member Type</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {children}
    </TableBody>
  </Table>
);

export default MembersTableHeader;
