import React from 'react';
import { Placeholder, PlaceholderImage, PlaceholderLine } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import common from '../common.module.scss';
import LikeButton from '@components/LikeButton';
import { IBindingAction } from '@models/Callbacks';
import { LocationDescriptor } from 'history';
import ImageContainer from '@components/ImageContainer';

export interface IBuildingListCardProps {
  imageSrc: string;
  name: string;
  meta: string;
  liked: boolean;
  toggleLike: IBindingAction;
  likeLoading: boolean;
  linkLocation: LocationDescriptor;
  loading?: boolean;
}

const BuildingListCard: React.FC<IBuildingListCardProps> = (
  { imageSrc, name, meta, liked, loading, toggleLike, likeLoading, linkLocation }
) => (
  <div className={styles.container}>
    {loading ? (
      <Placeholder className={styles.image}>
        <PlaceholderImage square />
      </Placeholder>
    ) : (
      <ImageContainer src={imageSrc} className={styles.image} />
    )}
    {loading ? (
      <Placeholder className={styles.name}>
        <PlaceholderLine />
      </Placeholder>
    ) : (
      <span className={`${styles.name} ${common.no_overflow}`} title={name}>{name}</span>
    )}
    {loading ? (
      <Placeholder className={styles.meta}>
        <PlaceholderLine />
      </Placeholder>
    ) : (
      <span className={`${styles.meta} ${common.no_overflow}`} title={meta}>{meta}</span>
    )}
    {loading ? (
      <Placeholder className={styles.link}>
        <PlaceholderLine />
      </Placeholder>
    ) : (
      <Link to={linkLocation} className={styles.link}>See Details</Link>
    )}
    {
      loading ? (
        <Placeholder>
          <PlaceholderLine length="very short" />
        </Placeholder>
      ) : (
        <div>
          <LikeButton liked={liked} onClick={toggleLike} loading={likeLoading} />
        </div>
      )
    }
  </div>
);

export default BuildingListCard;
