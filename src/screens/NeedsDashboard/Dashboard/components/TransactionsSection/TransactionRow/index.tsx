import React from 'react';
import styles from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection/styles.module.scss';
import { Label, TableCell, TableRow } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toPrice } from '@helpers/price.helper';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { IBindingCallback1 } from '@models/Callbacks';

interface ITransactionRowProps {
  transaction: ITransaction;
  onItemClick: IBindingCallback1<ITransaction>;
}

const TransactionRow: React.FC<ITransactionRowProps> = ({ transaction, onItemClick }) => (
  <TableRow key={transaction.id} onClick={() => onItemClick(transaction)} className={styles.row}>
    <TableCell className={styles.ellipsis}>{transaction.id}</TableCell>
    <TableCell className={styles.ellipsis}>
      <Link to={`/booking/${transaction.bookingId}`}>{transaction.bookingId}</Link>
    </TableCell>
    <TableCell>
      {transaction.paid ? <Label content="YES" color="green" /> : <Label content="NO" color="red" />}
    </TableCell>
    <TableCell>{transaction.paidFrom}</TableCell>
    <TableCell>{transaction.paidTo}</TableCell>
    <TableCell>{transaction.dateTime && moment(transaction.dateTime).format('HH:mm:ss LL')}</TableCell>
    <TableCell>{transaction.price && (`${toPrice(transaction.price)}`)}</TableCell>
    <TableCell>
      {transaction.stripeId && (
        <a
          href={`https://dashboard.stripe.com/test/payments/${transaction.stripeId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Label color="purple" content="Stripe" />
        </a>
      )}
      {transaction.paypalId && (<Label color="blue" content="Paypal" />)}
    </TableCell>
  </TableRow>
);

export default TransactionRow;
