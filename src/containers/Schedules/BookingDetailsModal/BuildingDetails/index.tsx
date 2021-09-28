import React, { useState } from 'react';
import { Button, Divider, Header } from 'semantic-ui-react';
import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import BuildingOnMaps from '@components/BuildingOnMaps';

export interface IBuildingDetailsProps {
  building: IBuildingForDisplaying;
}

const BuildingDetails: React.FC<IBuildingDetailsProps> = ({ building }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Divider />
      <Header>Building</Header>
      <p>{`Name: ${building.buildingName}`}</p>
      <p>{`Company: ${building.companyName}`}</p>
      <p>
        {`Address: ${building.location?.address || 'Unknown'} `}
        {
          building.location
          && <Button onClick={() => setShowMap(true)} icon="map outline" basic compact title="Click to open on a map" />
        }
      </p>
      <BuildingOnMaps setShowMap={setShowMap} showMap={showMap} building={building} />
    </>
  );
};

export default BuildingDetails;
