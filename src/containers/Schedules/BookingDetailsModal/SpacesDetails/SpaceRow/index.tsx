import React from 'react';
import { LabelGroup } from 'semantic-ui-react';
import { ITemplate2Amount } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';

export interface ISpaceRowProps {
  t2a: ITemplate2Amount;
}

const SpaceRow: React.FC<ISpaceRowProps> = ({ t2a }) => (
  <>
    <LabelGroup>
      <span>Name:&nbsp;</span>
      <span>{t2a.spaceTemplate.alias}</span>
    </LabelGroup>
    <LabelGroup>
      <span>Amount:&nbsp;</span>
      <span>{t2a.spaceIds.length}</span>
    </LabelGroup>
  </>
);

export default SpaceRow;
