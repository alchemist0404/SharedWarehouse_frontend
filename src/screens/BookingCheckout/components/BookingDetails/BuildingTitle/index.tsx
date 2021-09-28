import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';

export interface IBuildingTitleProps {
  buildingName: string;
}

const BuildingTitle: React.FC<IBuildingTitleProps> = ({ buildingName }) => (
  <>
    <h4 className={s.details__space_title_label}>SPACE TITLE</h4>
    <h2>{buildingName}</h2>
  </>
);

export default BuildingTitle;
