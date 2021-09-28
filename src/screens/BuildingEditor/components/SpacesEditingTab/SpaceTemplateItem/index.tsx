import React from 'react';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { toPrice } from '@helpers/price.helper';

export interface ISpaceTemplateItemProps {
  spaceTemplate: ISpaceTemplateDto;
}

const SpaceTemplateItem: React.FC<ISpaceTemplateItemProps> = ({ spaceTemplate: st }) => (
  <>
    <p>{`Alias: ${st.alias}`}</p>
    <p>{toPrice(st.pricePerDay)}</p>
    <p>{`Category: ${st.category}`}</p>
  </>
);

export default SpaceTemplateItem;
