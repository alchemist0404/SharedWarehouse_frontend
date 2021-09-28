import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTransactionsRoutine, setPageRoutine } from '@screens/NeedsDashboard/Transactions/routines';
import {
  extractCurrentPage,
  extractCurrentSize,
  extractFetchTransactionsLoading,
  extractTotalPages,
  extractTotalResults,
  extractTransactions
} from '@screens/NeedsDashboard/Transactions/reducers';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { IBindingCallback1 } from '@models/Callbacks';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import TransactionsSection from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection';
import Pagination from '@components/Pagination';
import { IPageable } from '@models/domain/PageableReducerState';

export interface ITransactionsProps extends IPageable {
  transactions: ITransaction[];
  fetchTransactions: IBindingCallback1<IPageRequest>;
  transactionsLoading: boolean;
  setPage: IBindingCallback1<number>;
}

const Transactions: React.FC<ITransactionsProps> = (
  { transactions, totalPages, page, fetchTransactions, setPage, pageSize, transactionsLoading }
) => {
  useEffect(() => {
    if (fetchTransactions) {
      fetchTransactions({ size: pageSize, page });
    }
  }, [fetchTransactions, page, pageSize]);

  return (
    <div className={common.container}>
      <h1>My transactions</h1>
      <TransactionsSection
        items={transactions}
        fetchItems={() => null}
        itemsLoading={transactionsLoading}
      />
      {!transactionsLoading && totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: extractTransactions(state),
  totalPages: extractTotalPages(state),
  totalResults: extractTotalResults(state),
  page: extractCurrentPage(state),
  pageSize: extractCurrentSize(state),
  transactionsLoading: extractFetchTransactionsLoading(state)
});

const mapDispatchToProps = {
  fetchTransactions: fetchTransactionsRoutine,
  setPage: setPageRoutine.fulfill
};

export { Transactions };

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
