import React, { useEffect } from 'react';
import { Label, Loader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '@screens/UserMain/containers/UserMainPage/styles.module.scss';
import { IBindingAction } from '@models/Callbacks';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import moment from 'moment/moment';
import { toPrice } from '@helpers/price.helper';

export interface ITransactionsTabProps {
  transactions: ITransaction[];
  error: string;
  loading: boolean;
  load: IBindingAction;
}

const TransactionsTab: React.FC<ITransactionsTabProps> = (
  { transactions, error, loading, load }
) => {
  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className={styles.container}>
      <Loader active={loading} />
      {error && (
        <Label color="red" content={error} basic />
      )}
      {!loading && (
        <Table celled sortable selectable size="small">
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
            {transactions.map(tr => (
              <TableRow key={tr.id}>
                <TableCell>{tr.id}</TableCell>
                <TableCell><Link to={`/booking/${tr.bookingId}`}>{tr.bookingId}</Link></TableCell>
                <TableCell>
                  {tr.paid ? <Label content="YES" color="green" /> : <Label content="NO" color="red" />}
                </TableCell>
                <TableCell>{tr.paidFrom}</TableCell>
                <TableCell>{tr.paidTo}</TableCell>
                <TableCell>{tr.dateTime && moment(tr.dateTime).format('HH:mm:ss LL')}</TableCell>
                <TableCell>{tr.price && (`${toPrice(tr.price.amount)} ${tr.price.currency}`)}</TableCell>
                <TableCell>
                  {tr.stripeId && (
                    <a
                      href={`https://dashboard.stripe.com/test/payments/${tr.stripeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Label color="purple" content="Stripe" />
                    </a>
                  )}
                  {tr.paypalId && (<Label color="blue" content="Paypal" />)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TransactionsTab;
