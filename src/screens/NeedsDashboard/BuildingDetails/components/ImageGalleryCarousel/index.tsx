import React from 'react';
import { ILoadableBuildingComponent } from '@screens/BuildingDetails/components/DescriptionSection/components/interface';
import OptionalSimpleCarousel from '@components/OptionalSimpleCarousel';
import ZoomableImage from '@screens/BuildingDetails/components/ZoomableImage';
import styles from './styles.module.scss';
import { Placeholder, PlaceholderImage } from 'semantic-ui-react';

export interface IImageGalleryCarouselProps extends ILoadableBuildingComponent {
  images: string[];
  className?: string;
}

const ImageGalleryCarousel: React.FC<IImageGalleryCarouselProps> = ({ images, className, loading }) => (
  <div className={className}>
    {loading ? (
      <Placeholder className={styles.no_carousel}>
        <PlaceholderImage />
      </Placeholder>
    ) : (
      <OptionalSimpleCarousel visibleSlides={1} naturalSlideHeight={0.4} classNameForNotCarousel={styles.no_carousel}>
        {images.map(img => <ZoomableImage key={img} src={img} />)}
      </OptionalSimpleCarousel>
    )}
  </div>
);

export default ImageGalleryCarousel;
