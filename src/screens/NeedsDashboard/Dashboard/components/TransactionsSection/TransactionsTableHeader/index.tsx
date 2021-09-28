import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { IWrapperProps } from '@components/InformationSection';

const TransactionsTableHeader: React.FC<IWrapperProps> = ({ haveMore, children }) => (
  <Table selectable singleLine padded attached={haveMore ? 'top' : undefined}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>ID</TableHeaderCell>
        <TableHeaderCell>BookingID</TableHeaderCell>
        <TableHeaderCell>Paid?</TableHeaderCell>
        <TableHeaderCell>From</TableHeaderCell>
        <TableHeaderCell>To</TableHeaderCell>
        <TableHeaderCell>Paid on</TableHeaderCell>
        <TableHeaderCell>Money</TableHeaderCell>
        <TableHeaderCell>Provider</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {children}
    </TableBody>
  </Table>
);

export default TransactionsTableHeader;
