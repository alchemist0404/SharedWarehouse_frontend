import React from 'react';
import { ILoadableBuildingComponent } from '../interface';
import { Placeholder, PlaceholderLine, PlaceholderParagraph } from 'semantic-ui-react';
import styles from './styles.module.scss';

export type IBuildingDescriptionProps = ILoadableBuildingComponent

const BuildingDescription: React.FC<IBuildingDescriptionProps> = ({ loading, building }) => (
  <>
    {loading ? (
      <Placeholder>
        <PlaceholderParagraph>
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
        </PlaceholderParagraph>
      </Placeholder>
    ) : (
      <p className={styles.description_text}>
        {building?.description && (
          <>
            {building.description}
          </>
        )}
      </p>
    )}
  </>
);

export default BuildingDescription;
