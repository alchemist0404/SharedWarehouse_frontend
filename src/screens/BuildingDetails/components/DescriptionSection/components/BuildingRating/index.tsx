import React from 'react';
import common from '@screens/BuildingDetails/components/DescriptionSection/styles.module.scss';
import { Placeholder, PlaceholderLine } from 'semantic-ui-react';
import { ILoadableBuildingComponent } from '../interface';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styles from './styles.module.scss';

export type IBuildingRatingProps = ILoadableBuildingComponent

const BuildingRating: React.FC<IBuildingRatingProps> = ({ loading, building }) => (
  <h3 className={styles.rating_label}>
    {loading ? (
      <Placeholder><PlaceholderLine length="very short" /></Placeholder>
    ) : (
      <>
        {building?.rating ? (
          <>
            <strong>4.8 / 5</strong>
            &nbsp;STARS BASED ON&nbsp;
            <AnchorLink offset="100" href="#reviews" class={common.link}>
              12 REVIEWS
            </AnchorLink>
          </>
        ) : (
          <>
            No reviews yet
          </>
        )}
      </>
    )}
  </h3>
);

export default BuildingRating;
