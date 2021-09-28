import { callApi } from '@helpers/api.helper';
import { IBankingData } from '@screens/HavesDashboard/FinancialBanking/model/BankingData';

const bankingService = {
  loadBankingData: () => callApi({
    method: 'GET',
    endpoint: 'banking'
  }),
  updateBankingData: (requestData: IBankingData) => callApi({
    method: 'POST',
    endpoint: 'banking',
    requestData
  })
};

export default bankingService;
