import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import StripeAddCardForm, { ICreateCardRequest } from '@components/StripeAddCardForm';

export interface INewCardModalProps extends INewCardExternalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  email: string;
}

export interface INewCardExternalProps {
  addNewCard: IBindingCallback1<ICreateCardRequest>;
  addNewCardLoading: boolean;
  addNewCardError?: string;
}

const NewCardModal: React.FC<INewCardModalProps> = (
  { open, setOpen, addNewCard, addNewCardLoading, email, addNewCardError }
) => {
  useEffect(() => {
    if (!addNewCardError && !addNewCardLoading) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewCardLoading]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} size="mini">
      <ModalHeader>Add new card</ModalHeader>
      <ModalContent>
        <StripeAddCardForm
          addCardLoading={addNewCardLoading}
          userEmail={email}
          error={addNewCardError}
          addCard={addNewCard}
        />
      </ModalContent>
    </Modal>
  );
};

export default NewCardModal;
