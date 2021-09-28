import React from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { connect } from 'react-redux';
import SpacesSection from '@screens/NeedsDashboard/Dashboard/components/SpacesSection';
import TransactionsSection from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection';
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Dashboard/routines';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import {
  extractFetchMyBuildingsLoading,
  extractFetchMyTransactionsLoading,
  extractMoreBuildings,
  extractMoreTransactions,
  extractMyBuildings,
  extractMyTransactions
} from '@screens/NeedsDashboard/Dashboard/reducers';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';

export interface IDashboardProps {
  buildings: IResultBuildingItem[];
  fetchBuildings: IBindingAction;
  buildingsLoading: boolean;
  toggleBuildingLike: IBindingCallback1<string>;
  transactions: ITransaction[];
  fetchTransactions: IBindingAction;
  transactionsLoading: boolean;
  moreTransactions: boolean;
  moreBuildings: boolean;
}

const Dashboard: React.FC<IDashboardProps> = (
  {
    fetchBuildings, fetchTransactions, buildings, transactions, buildingsLoading,
    transactionsLoading, toggleBuildingLike, moreBuildings, moreTransactions
  }
) => (
  <div className={common.container}>
    <h1>Dashboard</h1>
    <SpacesSection
      items={buildings}
      itemsLoading={buildingsLoading}
      fetchItems={fetchBuildings}
      toggleLike={toggleBuildingLike}
      haveMore={moreBuildings}
    />
    <TransactionsSection
      items={transactions}
      itemsLoading={transactionsLoading}
      fetchItems={fetchTransactions}
      haveMore={moreTransactions}
    />
  </div>
);

const mapStateToProps = state => ({
  buildings: extractMyBuildings(state),
  transactions: extractMyTransactions(state),
  buildingsLoading: extractFetchMyBuildingsLoading(state),
  transactionsLoading: extractFetchMyTransactionsLoading(state),
  moreTransactions: extractMoreTransactions(state),
  moreBuildings: extractMoreBuildings(state)
});

const mapDispatchToProps = {
  fetchBuildings: fetchMyBuildingsRoutine,
  fetchTransactions: fetchMyTransactionsRoutine,
  toggleBuildingLike: toggleFavoriteBuildingRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
