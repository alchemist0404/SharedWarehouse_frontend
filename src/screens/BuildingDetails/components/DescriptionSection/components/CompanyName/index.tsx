import React from 'react';
import { Placeholder, PlaceholderLine } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { IBuildingForDisplaying, IBuildingForEditing } from '@screens/BuildingDetails/model/BuildingDetailsResponse';

export interface ICompanyNameProps {
  loading: boolean;
  building: IBuildingForEditing | IBuildingForDisplaying;
}

const CompanyName: React.FC<ICompanyNameProps> = ({ loading, building }) => (
  <h3 className={styles.listed_by_label}>
    {loading ? (
      <Placeholder><PlaceholderLine length="short" /></Placeholder>
    ) : (
      <>
        {building?.companyName.toUpperCase()}
      </>
    )}
  </h3>
);

export default CompanyName;
