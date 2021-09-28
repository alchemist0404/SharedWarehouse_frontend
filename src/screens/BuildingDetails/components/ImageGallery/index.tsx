import React from 'react';
import ZoomableImage from '@screens/BuildingDetails/components/ZoomableImage';
import { Placeholder, PlaceholderImage } from 'semantic-ui-react';
import { times, isEmpty } from 'lodash';
import defaultBuildingDetailImage from '@images/default_Building_Detail_Image.jpg';
import styles from './styles.module.scss';

export interface IImageGalleryProps {
  images: string[];
  classNames: string;
  loading: boolean;
}

const ImageGallery: React.FC<IImageGalleryProps> = ({ images, classNames, loading }) => (
  <div className={classNames}>
    {loading ? times(3, i => (
      <Placeholder key={i} className={styles.placeholder}>
        <PlaceholderImage square />
      </Placeholder>
    )) : (
      <>
        {!isEmpty(images)
          ? images.map(img => (
            <ZoomableImage
              key={img}
              size="massive"
              src={img}
              thumb={img}
              alt="No description available"
            />
          ))
          : (
            <ZoomableImage
              key={defaultBuildingDetailImage}
              size="massive"
              src={defaultBuildingDetailImage}
              thumb={defaultBuildingDetailImage}
              alt="No description available"
            />
          )}
      </>
    )}
  </div>
);

export default ImageGallery;
