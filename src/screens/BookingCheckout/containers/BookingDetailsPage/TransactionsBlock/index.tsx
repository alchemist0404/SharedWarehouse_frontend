import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import ResultsWithPagination from '@components/ResultsWithPagination';
import { connect } from 'react-redux';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { IBindingCallback1 } from '@models/Callbacks';
import TransactionsSection from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import { fetchTransactionsRoutine, setTransactionsPageRoutine } from '@screens/BookingCheckout/routines';
import {
  extractBookingTransactions,
  extractCurrentTransactionPage,
  extractFetchTransactionsLoading,
  extractTotalTransactionPages,
  extractTransactionPageSize
} from '@screens/BookingCheckout/reducers';

export interface ITransactionsSectionProps extends IState, IActions {
  className?: string;
  bookingId: string;
}

interface IState {
  transactionsLoading: boolean;
  transactions: ITransaction[];
  currentPage: number;
  totalPages: number;
  pageSize: number | PageSize;
}

interface IActions {
  setPage: IBindingCallback1<number>;
  fetchTransactions: IBindingCallback1<IFetchTransactionsForBookingRequest>;
}

export interface IFetchTransactionsForBookingRequest {
  bookingId: string;
  pageRequest: IPageRequest;
}

const TransactionsBlock: React.FC<ITransactionsSectionProps> = (
  {
    className, transactions, transactionsLoading, totalPages, setPage, fetchTransactions, currentPage, bookingId,
    pageSize
  }
) => {
  useEffect(() => {
    if (bookingId && fetchTransactions) {
      fetchTransactions({
        bookingId,
        pageRequest: { page: currentPage, size: pageSize }
      });
    }
  }, [bookingId, pageSize, currentPage, fetchTransactions]);

  useEffect(() => {
    if (bookingId) {
      setPage(1);
    }
  }, [bookingId, setPage]);

  return (
    <div className={className}>
      <h4>TRANSACTIONS</h4>
      {transactionsLoading ? <Loader active inline="centered" />
        : (
          <ResultsWithPagination
            loading={transactionsLoading}
            setPage={setPage}
            totalPages={totalPages}
            page={currentPage}
          >
            <TransactionsSection
              items={transactions}
              fetchItems={() => null}
              itemsLoading={transactionsLoading}
              hideTitle
            />
          </ResultsWithPagination>
        )}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  transactions: extractBookingTransactions(state),
  transactionsLoading: extractFetchTransactionsLoading(state),
  currentPage: extractCurrentTransactionPage(state),
  totalPages: extractTotalTransactionPages(state),
  pageSize: extractTransactionPageSize(state)
});

const mapDispatchToProps: IActions = {
  fetchTransactions: fetchTransactionsRoutine,
  setPage: setTransactionsPageRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsBlock);
