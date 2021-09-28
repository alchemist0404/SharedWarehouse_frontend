import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { ITemplate2Amount } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import SpaceRow from './SpaceRow';

export interface ISpacesDetailsProps {
  templatesToAmounts: ITemplate2Amount[];
}

const SpacesDetails: React.FC<ISpacesDetailsProps> = ({ templatesToAmounts }) => (
  <>
    <Divider />
    <Header>Spaces</Header>
    {templatesToAmounts.map(t2a => <SpaceRow key={t2a.spaceTemplate.id} t2a={t2a} />)}
  </>
);

export default SpacesDetails;
