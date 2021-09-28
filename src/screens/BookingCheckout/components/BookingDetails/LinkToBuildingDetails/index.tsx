import React from 'react';
import { Link } from 'react-router-dom';

export interface ILinkToBuildingDetailsProps {
  id: string;
}

const LinkToBuildingDetails: React.FC<ILinkToBuildingDetailsProps> = ({ id }) => (
  <Link to={`/details/${id}`}><b>SPACE DETAILS</b></Link>
);

export default LinkToBuildingDetails;
