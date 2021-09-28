import React from 'react';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { ITransaction } from '@screens/UserMain/model/Transaction';

export interface ITransactionDetailsModalProps {
  expandedTransaction?: ITransaction;
  setExpandedTransaction: (transaction: ITransaction) => void;
}

const TransactionDetailsModal: React.FC<ITransactionDetailsModalProps> = (
  { expandedTransaction, setExpandedTransaction }
) => (
  <Modal open={expandedTransaction !== undefined} onClose={() => setExpandedTransaction(undefined)} closeIcon>
    <ModalHeader>Transaction</ModalHeader>
    <ModalContent>
      <p>{`ID: ${expandedTransaction?.id}`}</p>
      <p>{`Payment period: ${expandedTransaction?.paidFrom} - ${expandedTransaction?.paidTo}`}</p>
    </ModalContent>
  </Modal>
);

export default TransactionDetailsModal;
