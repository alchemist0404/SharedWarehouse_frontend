import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHeader,
  TableHeaderCell,
  TableProps,
  TableRow,
  TableRowProps
} from 'semantic-ui-react';
import styles from './styles.module.scss';

export interface ISimpleTableProps {
  titles: string[];
  rows: Row[];
  tableProps?: TableProps;
}

type Row = {
  id: string;
  cells: Cell[];
  rowProps?: TableRowProps;
};

type Cell = {
  content: JSX.Element | string | React.FC;
  props?: TableCellProps;
};

const SimpleTable: React.FC<ISimpleTableProps> = (
  { titles, rows, tableProps }
) => (
  <Table selectable singleLine padded="very" {...tableProps}>
    <TableHeader>
      <TableRow>
        {titles.map(title => <TableHeaderCell key={title} content={title} />)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map(row => (
        <TableRow {...row.rowProps} key={row.id} className={styles.row}>
          {row.cells.map((cell, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index} content={cell.content} {...cell.props} />
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default SimpleTable;
