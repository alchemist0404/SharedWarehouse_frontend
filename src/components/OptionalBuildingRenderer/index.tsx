import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import BuildingDetails from '@screens/NeedsDashboard/BuildingDetails/containers/BuildingDetailsPage';

const OptionalBuildingRenderer: React.FC = (
  { children }
) => {
  const location = useLocation();
  const { building } = parse(location.search);
  return (
    <>
      {building ? (<BuildingDetails />) : (children)}
    </>
  );
};

export default OptionalBuildingRenderer;
