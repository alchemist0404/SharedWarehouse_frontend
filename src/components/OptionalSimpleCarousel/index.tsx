import React from 'react';
import SimpleCarousel from '@components/SimpleCarousel';
import { Slide } from 'pure-react-carousel';
import styles from './styles.module.scss';

export interface IOptionalSimpleCarouselProps {
  visibleSlides: number;
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
  classNameForNotCarousel?: string;
}

const OptionalSimpleCarousel: React.FC<IOptionalSimpleCarouselProps> = (
  { visibleSlides, naturalSlideWidth, naturalSlideHeight, classNameForNotCarousel, children }
) => {
  const multipleChildren = Array.isArray(children);
  const totalSlides = multipleChildren ? (children as []).length : 1;
  const isCarousel = multipleChildren && visibleSlides < (totalSlides);

  return (
    <>
      {isCarousel ? (
        <SimpleCarousel
          visibleSlides={visibleSlides}
          naturalSlideWidth={naturalSlideWidth}
          naturalSlideHeight={naturalSlideHeight}
        >
          {(children as []).map((ch, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Slide key={index} index={index} className={styles.card}>
              {ch}
            </Slide>
          ))}
        </SimpleCarousel>
      ) : (
        <div className={`${styles.horizontal} ${classNameForNotCarousel || ''}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default OptionalSimpleCarousel;
