import React from 'react';
import { ILoadableBuildingComponent } from '../interface';
import s from '@screens/BuildingDetails/components/DescriptionSection/styles.module.scss';
import { Label } from 'semantic-ui-react';
import styles from './styles.module.scss';

export type IBuildingTagsProps = ILoadableBuildingComponent

const BuildingTags: React.FC<IBuildingTagsProps> = ({ loading, building }) => (
  <>
    {loading || (
    <>
      <h4 className={s.subtitle}>Standard Building Features:</h4>
      <div className={styles.tags}>
        {building?.tags.map(t => <Label key={t} basic color="blue" content={t} />)}
      </div>
    </>
    )}
  </>
);

export default BuildingTags;
