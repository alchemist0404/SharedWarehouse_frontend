import React from 'react';
import { connect } from 'react-redux';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import MessagesSection from '@components/MessagesSection';
import TransactionsSection from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection';
import SpacesSection from '@screens/NeedsDashboard/Dashboard/components/SpacesSection';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Dashboard/routines';
import {
  extractFetchMyBuildingsLoading,
  extractFetchMyTransactionsLoading,
  extractMoreBuildings,
  extractMoreTransactions,
  extractMyBuildings,
  extractMyTransactions
} from '@screens/HavesDashboard/Dashboard/reducers';
import ScrollToTopOnMount from '@components/ScrollToTop';

export interface IDashboardProps {
  toggleFavoriteBuilding: IBindingCallback1<string>;
  fetchOwnedBuildings: IBindingAction;
  buildingsLoading: boolean;
  buildings: IResultBuildingItem[];
  fetchMyTransactions: IBindingAction;
  transactionsLoading: boolean;
  transactions: ITransaction[];
  moreBuildings: boolean;
  moreTransactions: boolean;
}

const Dashboard: React.FC<IDashboardProps> = (
  {
    buildings, buildingsLoading, fetchOwnedBuildings, transactions, transactionsLoading,
    fetchMyTransactions, toggleFavoriteBuilding, moreTransactions, moreBuildings
  }
) => (
  <div className={common.container}>
    <ScrollToTopOnMount />
    <h1>Dashboard</h1>
    <MessagesSection
      items={[]}
      // todo: implement
      fetchItems={() => console.warn('implement loading messages')}
      itemsLoading={false}
    />
    <SpacesSection
      title="My shared spaces"
      toggleLike={toggleFavoriteBuilding}
      items={buildings}
      fetchItems={fetchOwnedBuildings}
      itemsLoading={buildingsLoading}
      haveMore={moreBuildings}
    />
    <TransactionsSection
      title="My transactions"
      items={transactions}
      fetchItems={fetchMyTransactions}
      itemsLoading={transactionsLoading}
      haveMore={moreTransactions}
    />
  </div>
);

const mapStateToProps = state => ({
  buildings: extractMyBuildings(state),
  transactions: extractMyTransactions(state),
  buildingsLoading: extractFetchMyBuildingsLoading(state),
  transactionsLoading: extractFetchMyTransactionsLoading(state),
  moreBuildings: extractMoreBuildings(state),
  moreTransactions: extractMoreTransactions(state)
});

const mapDispatchToProps = {
  toggleFavoriteBuilding: toggleFavoriteBuildingRoutine,
  fetchOwnedBuildings: fetchMyBuildingsRoutine,
  fetchMyTransactions: fetchMyTransactionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
