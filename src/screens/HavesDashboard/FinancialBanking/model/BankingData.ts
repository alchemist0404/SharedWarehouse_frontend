export interface IBankingData {
  bankName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  beneficiaryName: string;
  address1: string | null;
  address2: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
}
