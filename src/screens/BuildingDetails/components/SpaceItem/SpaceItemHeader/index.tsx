import React from 'react';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Label
} from 'semantic-ui-react';
import { SpaceType } from '@models/domain/space/SpaceTypes';
import { lowerCase, startCase } from 'lodash';
import styles from './styles.module.scss';

export interface ISpaceItemHeaderProps {
  space: ISpaceWithAvailability;
}

const SpaceItemHeader: React.FC<ISpaceItemHeaderProps> = ({ space }) => {
  const available = space.amountAvailable > 0;
  return (
    <>
      <CardContent>
        <CardHeader className={styles.header}>
          <Label color={available ? 'green' : 'red'} basic={!available}>
            {available ? 'Available' : 'Not available'}
          </Label>
          <span>{startCase(lowerCase(SpaceType[space.spaceType]))}</span>
        </CardHeader>
        <CardMeta>{space.alias}</CardMeta>
        <CardDescription className={styles.description}>
          <Label basic color="blue" size="mini" className={styles.category}>{space.spaceCategory}</Label>
          <span className={styles.price}>{`${space.pricePerDay} ${space.currency}`}</span>
          <span className={styles.dimensions}>
            {`Dimensions (LxWxH): ${space.length}x${space.width}x${space.height} ${space.lengthUnit.toLowerCase()}`}
          </span>
        </CardDescription>
        <Label floating>
          {space.amountAvailable}
          &nbsp;available
        </Label>
      </CardContent>
    </>
  );
};

export default SpaceItemHeader;
