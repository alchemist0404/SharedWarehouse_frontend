import React, { useMemo } from 'react';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import { Button, Card, CardContent, Label } from 'semantic-ui-react';
import { IBindingAction } from '@models/Callbacks';
import styles from './styles.module.scss';
import visaSvg from '@images/svg/visa.svg';
import mastercardSvg from '@images/svg/mastercard.svg';

export interface ICreditCardItemProps {
  creditCard: ICreditCard;
  onRemove: IBindingAction;
  removeLoading: boolean;
  onSetPrimary: IBindingAction;
  primaryLoading: boolean;
  className?: string;
}

export const twoDigit = num => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

const CreditCardItem: React.FC<ICreditCardItemProps> = (
  {
    creditCard: { brand, expMonth, expYear, last4, primary }, onRemove, onSetPrimary, removeLoading, primaryLoading,
    className
  }
) => {
  const logo = useMemo(() => {
    switch (brand) {
      case 'visa':
        return visaSvg;
      case 'mastercard':
        return mastercardSvg;
      default:
        return undefined;
    }
  }, [brand]);

  return (
    <Card className={className}>
      <CardContent className={styles.card_content}>
        {primary && <Label corner="left" icon="star" color="orange" />}
        {logo ? (
          <img className={styles.card_brand_icon} src={logo} alt={brand} />
        ) : (
          <Label className={styles.card_brand} color="blue" content={brand.toUpperCase()} />
        )}
        <div className={styles.card_number}>
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>{last4}</span>
        </div>
        <div className={styles.card_info_section}>
          <div className={styles.card_holder_section} />
          <div className={styles.card_expiration_section}>
            <span className={styles.card_expiration_label}>Expires</span>
            <p className={styles.card_expiration_value}>
              {`${twoDigit(expMonth)}/${twoDigit(expYear)}`}
            </p>
          </div>
        </div>
      </CardContent>
      <CardContent extra>
        <Button
          color="orange"
          content="Make primary"
          onClick={onSetPrimary}
          loading={primaryLoading}
          disabled={primary}
          basic
        />
        <Button
          color="red"
          content="Remove"
          onClick={onRemove}
          loading={removeLoading}
          basic
        />
      </CardContent>
    </Card>
  );
};

export default CreditCardItem;
