import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import FinancialBankingForm from '@screens/HavesDashboard/FinancialBanking/components/FinancialBankingForm';
import { loadBankingDataRoutine, updateBankingDataRoutine } from '@screens/HavesDashboard/FinancialBanking/routines';
import { IBindingAction } from '@models/Callbacks';
import {
  extractBankingData,
  extractLoadBankingDataLoading,
  extractUpdateBankingDataLoading
} from '@screens/HavesDashboard/FinancialBanking/reducers';
import { IBankingData } from '@screens/HavesDashboard/FinancialBanking/model/BankingData';

export interface IFinancialBankingProps {
  loadBankingData: IBindingAction;
  updateBankingData: IBindingAction;
  bankingData?: IBankingData;
  bankingDataLoading: boolean;
  bankingDataSaving: boolean;
}

const FinancialBanking: React.FC<IFinancialBankingProps> = (
  { loadBankingData, bankingData, bankingDataLoading, updateBankingData, bankingDataSaving }
) => {
  useEffect(() => {
    loadBankingData();
  }, [loadBankingData]);

  return (
    <div className={classNames(common.container, styles.container)}>
      <h1>My Banking Info</h1>
      <p className={common.bold}>
        This is your Banking Information,
        where you will receive your monthly payments for hosting your spaces
      </p>
      <p>
        You will need to get Bank Routing and Account Number,
        so you can enter it all here.
        This information is usually found at the bottom of your checks.
      </p>
      <FinancialBankingForm
        saveChanges={updateBankingData}
        initialValuesLoading={bankingDataLoading}
        savingLoading={bankingDataSaving}
        className={styles.form}
        initialFormData={bankingData}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  bankingData: extractBankingData(state),
  bankingDataLoading: extractLoadBankingDataLoading(state),
  bankingDataSaving: extractUpdateBankingDataLoading(state)
});

const mapDispatchToProps = {
  loadBankingData: loadBankingDataRoutine,
  updateBankingData: updateBankingDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialBanking);
