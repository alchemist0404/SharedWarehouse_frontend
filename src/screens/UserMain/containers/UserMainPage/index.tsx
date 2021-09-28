import React from 'react';
import { connect } from 'react-redux';
import { ICurrentUser } from '@screens/Authorization/models/CurrentUser';
import { extractCurrentUser } from '@screens/Authorization/reducers';
import styles from './styles.module.scss';
import { fetchBookingsRoutine, fetchTransactionsRoutine } from '@screens/UserMain/routines';
import {
  extractBookings,
  extractFetchBookingsError,
  extractFetchBookingsLoading,
  extractFetchTransactionsError,
  extractFetchTransactionsLoading,
  extractTransactions
} from '@screens/UserMain/reducers';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { IBindingAction } from '@models/Callbacks';
import Tabs from '@components/Tabs';
import BookingsTab from '@screens/UserMain/components/BookingsTab';
import TransactionsTab from '@screens/UserMain/components/TransactionsTab';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { Link } from 'react-router-dom';
import { NEEDS_DASHBOARD_ENDPOINTS } from '@screens/NeedsDashboard/Root/components/Routing/endpoints';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserMainProps {
  user: ICurrentUser;
  bookings: IBriefBookingDto[];
  bookingsLoading: boolean;
  bookingsError: string;
  transactions: ITransaction[];
  transactionsLoading: boolean;
  transactionsError: string;
  loadBookings: IBindingAction;
  loadTransactions: IBindingAction;
}

const UserMainPage: React.FC<IUserMainProps> = (
  { user, bookings, bookingsLoading, bookingsError, loadBookings, transactions,
    loadTransactions, transactionsError, transactionsLoading }
) => (
  <div className={`${styles.container} content_wrapper`}>
    <h1>authenticated user main page</h1>
    <span>{user.email}</span>
    <span>{user.roles === [] ? 'no roles' : user.roles.join(',')}</span>
    <Link to={NEEDS_DASHBOARD_ENDPOINTS.DASHBOARD}>NEEDs dashboard</Link>
    <Link to={HAVES_DASHBOARD_ENDPOINTS.DASHBOARD}>HAVEs dashboard</Link>
    <Tabs content={[
      {
        key: 'bookings',
        name: 'bookings',
        element: {
          Element: BookingsTab,
          props: {
            bookings,
            error: bookingsError,
            loading: bookingsLoading,
            load: loadBookings
          }
        }
      },
      {
        key: 'transactions',
        name: 'transactions',
        element: {
          Element: TransactionsTab,
          props: {
            transactions,
            error: transactionsError,
            loading: transactionsLoading,
            load: loadTransactions
          }
        }
      }
    ]}
    />
  </div>
);

const mapStateToProps = state => ({
  user: extractCurrentUser(state),
  bookings: extractBookings(state),
  bookingsLoading: extractFetchBookingsLoading(state),
  bookingsError: extractFetchBookingsError(state),
  transactions: extractTransactions(state),
  transactionsLoading: extractFetchTransactionsLoading(state),
  transactionsError: extractFetchTransactionsError(state)
});

const mapDispatchToProps = {
  loadBookings: fetchBookingsRoutine,
  loadTransactions: fetchTransactionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMainPage);
