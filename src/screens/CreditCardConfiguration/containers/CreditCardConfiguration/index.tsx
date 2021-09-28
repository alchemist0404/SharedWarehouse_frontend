import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import {
  addNewCreditCardRoutine,
  loadCreditCardsRoutine,
  removeCardRoutine,
  setDefaultCardRoutine
} from '@screens/CreditCardConfiguration/routines';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import {
  extractAddNewCreditCardError,
  extractAddNewCreditCardLoading,
  extractCreditCards,
  extractLoadCreditCardsLoading,
  extractRemoveCardLoading,
  extractSetDefaultCardLoading
} from '@screens/CreditCardConfiguration/reducers';
import { Button, Loader } from 'semantic-ui-react';
import NewCardModal from '@screens/CreditCardConfiguration/components/NewCardModal';
import { extractUserEmail } from '@screens/Authorization/reducers';
import { ICreateCardRequest } from '@components/StripeAddCardForm';
import CreditCardItem from '@screens/CreditCardConfiguration/components/CreditCardItem';
import styles from './styles.module.scss';

export interface ICreditCardConfigurationProps extends IState, IActions {
}

interface IState {
  creditCards: ICreditCard[];
  cardsLoading: boolean;
  email: string;
  addNewCardLoading: boolean;
  addNewCardError?: string;
  removeLoading: boolean;
  defaultLoading: boolean;
}

interface IActions {
  loadCreditCards: IBindingAction;
  addNewCard: IBindingCallback1<ICreateCardRequest>;
  removeCard: IBindingCallback1<string>;
  setDefaultCard: IBindingCallback1<string>;
}

const CreditCardConfiguration: React.FC<ICreditCardConfigurationProps> = (
  {
    cardsLoading, creditCards, loadCreditCards, addNewCardLoading, addNewCard, email,
    addNewCardError, removeCard, setDefaultCard, removeLoading, defaultLoading
  }
) => {
  const [newCardModalOpen, setNewCardModalOpen] = useState(false);
  useEffect(() => {
    loadCreditCards();
  }, [loadCreditCards]);

  return (
    <>
      {cardsLoading && <Loader active inline="centered" />}
      {!cardsLoading && (
        <>
          <Button
            color="orange"
            icon="plus"
            content="Add new"
            labelPosition="left"
            onClick={() => setNewCardModalOpen(true)}
            className={styles.add_btn}
          />
          {creditCards.length === 0 ? (
            <h3>No cards</h3>
          ) : (
            <div className={styles.cards_container}>
              {creditCards.map(cc => (
                <CreditCardItem
                  className={styles.credit_card}
                  key={cc.id}
                  creditCard={cc}
                  onRemove={() => removeCard(cc.id)}
                  onSetPrimary={() => setDefaultCard(cc.id)}
                  removeLoading={removeLoading}
                  primaryLoading={defaultLoading}
                />
              ))}
            </div>
          )}
        </>
      )}
      <NewCardModal
        email={email}
        addNewCardError={addNewCardError}
        addNewCardLoading={addNewCardLoading}
        open={newCardModalOpen}
        setOpen={setNewCardModalOpen}
        addNewCard={addNewCard}
      />
    </>
  );
};

const mapStateToProps: (state) => IState = state => ({
  creditCards: extractCreditCards(state),
  cardsLoading: extractLoadCreditCardsLoading(state),
  email: extractUserEmail(state),
  addNewCardLoading: extractAddNewCreditCardLoading(state),
  addNewCardError: extractAddNewCreditCardError(state),
  removeLoading: extractRemoveCardLoading(state),
  defaultLoading: extractSetDefaultCardLoading(state)
});

const mapDispatchToProps: IActions = {
  loadCreditCards: loadCreditCardsRoutine,
  addNewCard: addNewCreditCardRoutine,
  removeCard: removeCardRoutine,
  setDefaultCard: setDefaultCardRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardConfiguration);
