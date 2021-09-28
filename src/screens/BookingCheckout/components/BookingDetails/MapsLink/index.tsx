import React, { useState } from 'react';
import BuildingOnMaps from '@components/BuildingOnMaps';
import s from './styles.module.scss';
import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';

export interface IMapsLinkProps {
  building: IBuildingForDisplaying;
}

const MapsLink: React.FC<IMapsLinkProps> = ({ building }) => {
  const [showMap, setShowMap] = useState(false);
  return (
    <>
      <BuildingOnMaps showMap={showMap} setShowMap={setShowMap} building={building} />
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={() => setShowMap(true)} className={s.details__link}>Open in Google Maps</a>
    </>
  );
};

export default MapsLink;
