import { connect } from 'react-redux';
import {
  extractCurrentPage,
  extractCurrentSize,
  extractFetchTransactionsLoading,
  extractTotalPages,
  extractTotalResults,
  extractTransactions
} from '@screens/HavesDashboard/Transactions/reducers';
import { fetchTransactionsRoutine, setPageRoutine } from '@screens/HavesDashboard/Transactions/routines';
import { Transactions } from '@root/screens/NeedsDashboard/Transactions/containers/TransactionsPage';

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

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
