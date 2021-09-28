import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import PaymentStep from '../PaymentStepWithoutFetching';

export interface IPaymentModalProps {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  paymentRequirements: IPaymentRequirementResponse;
}

const PaymentModal: React.FC<IPaymentModalProps> = ({ modalOpen, setModalOpen, paymentRequirements }) => {
  useEffect(() => {
    setModalOpen(false);
  }, [paymentRequirements, setModalOpen]);

  return (
    <Modal size="tiny" open={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalHeader>Payment</ModalHeader>
      <ModalContent>
        {paymentRequirements && (
          <PaymentStep paymentRequirements={paymentRequirements} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
