import React, { useCallback, useState } from 'react';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { Button, TableCell, TableRow } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { IInformationSectionProps, InformationSection } from '@components/InformationSection';
import { NEEDS_DASHBOARD_ENDPOINTS } from '@screens/NeedsDashboard/Root/components/Routing/endpoints';
import _ from 'lodash';
import TransactionDetailsModal from './TransactionDetailsModal';
import TransactionsTableHeader
  from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection/TransactionsTableHeader';
import TransactionRow from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection/TransactionRow';

const transactionToItem = (tr: ITransaction, setExpanded) => (
  <TransactionRow key={tr.id} onItemClick={setExpanded} transaction={tr} />
);

const TransactionsSection: React.FC<IInformationSectionProps<ITransaction>> = (
  {
    title = 'My transactions',
    ...props
  }
) => {
  const history = useHistory();
  const [expandedTransaction, setExpandedTransaction] = useState<ITransaction>();
  const itemToElement = useCallback(item => transactionToItem(item, setExpandedTransaction), [setExpandedTransaction]);

  return (
    <>
      <TransactionDetailsModal
        setExpandedTransaction={setExpandedTransaction}
        expandedTransaction={expandedTransaction}
      />
      <InformationSection
        {...props}
        title={title}
        renderItem={itemToElement}
        itemsWrapper={TransactionsTableHeader}
        noItemsPlaceholder={() => (
          <TableRow>
            <TableCell>No items</TableCell>
            {_.times(7).map(i => <TableCell key={i} />)}
          </TableRow>
        )}
        loadMoreComponent={() => (
          <Button
            content="Load more..."
            attached="bottom"
            onClick={() => history.push(NEEDS_DASHBOARD_ENDPOINTS.TRANSACTIONS)}
          />
        )}
      />
    </>
  );
};

export default TransactionsSection;
