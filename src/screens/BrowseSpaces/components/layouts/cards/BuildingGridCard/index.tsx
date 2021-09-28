import React from 'react';
import { IBuildingListCardProps } from '@screens/BrowseSpaces/components/layouts/cards/BuildingListCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Placeholder,
  PlaceholderHeader,
  PlaceholderImage,
  PlaceholderLine,
  PlaceholderParagraph
} from 'semantic-ui-react';
import { history } from '@helpers/history.helper';
import styles from './styles.module.scss';
import common from '../common.module.scss';
import LikeButton from '@components/LikeButton';
import { Link } from 'react-router-dom';
import defaultImg from '@images/default_250x205.jpg';
import ImageContainer from '@components/ImageContainer';

type IBuildingGridCardProps = IBuildingListCardProps;

const BuildingGridCard: React.FC<IBuildingGridCardProps> = (
  {
    imageSrc, name, meta, liked,
    linkLocation, loading, toggleLike, likeLoading
  }
) => {
  const handleLike = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    toggleLike();
  };

  return (
    <Card
      onClick={() => history.push(linkLocation)}
      className={styles.card}
      raised={false}
      as="div"
    >
      {loading ? (
        <Placeholder>
          <PlaceholderImage />
        </Placeholder>
      ) : (
        <>
          <ImageContainer
            className={styles.image}
            src={imageSrc || defaultImg}
          />
          <div className={styles.like_container}>
            <LikeButton
              liked={liked}
              onClick={handleLike}
              className={styles.like}
              size="massive"
              loading={likeLoading}
            />
          </div>
        </>
      )}
      <CardContent>
        {loading ? (
          <Placeholder>
            <PlaceholderHeader>
              <PlaceholderLine length="short" />
            </PlaceholderHeader>
            <PlaceholderParagraph>
              <PlaceholderLine />
            </PlaceholderParagraph>
          </Placeholder>
        ) : (
          <>
            <CardHeader className={`${styles.name} ${common.no_overflow}`} title={name}>
              <Link to={linkLocation} className={styles.link} onClick={ev => ev.preventDefault()}>
                {name}
              </Link>
            </CardHeader>
            <CardDescription className={`${styles.meta} ${common.no_overflow}`} title={meta}>{meta}</CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BuildingGridCard;
