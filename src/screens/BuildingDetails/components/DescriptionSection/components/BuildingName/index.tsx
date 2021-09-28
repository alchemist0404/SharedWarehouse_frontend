import React from 'react';
import { Placeholder, PlaceholderLine } from 'semantic-ui-react';
import { ILoadableBuildingComponent } from '../interface';
import styles from './styles.module.scss';
import LikeButton from '@components/LikeButton';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IBuildingNameProps extends ILoadableBuildingComponent {
  previewBuildingName: string;
  toggleLike?: IBindingCallback1<string>;
  likeLoading?: boolean;
}

const BuildingName: React.FC<IBuildingNameProps> = (
  { loading, building, previewBuildingName, toggleLike, likeLoading }
) => (
  <>
    {loading ? (
      <>
        {previewBuildingName ? (
          <h1 className={styles.building_name_label}>{previewBuildingName}</h1>
        ) : (
          <Placeholder><PlaceholderLine length="very long" /></Placeholder>
        )}
      </>
    ) : (
      <div className={styles.section}>
        <h1 className={styles.building_name_label}>{building?.buildingName || previewBuildingName || '...'}</h1>
        <div className={styles.filler} />
        {toggleLike && (
          <LikeButton
            liked={building?.favorite}
            size="massive"
            loading={likeLoading}
            onClick={() => toggleLike(building?.id)}
          />
        )}
      </div>
    )}
  </>
);

export default BuildingName;
