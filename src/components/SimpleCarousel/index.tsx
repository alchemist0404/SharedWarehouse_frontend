import React from 'react';
import { CarouselProvider } from 'pure-react-carousel';
import SimpleCarouselContent from '@components/SimpleCarouselContent';

export interface ISimpleCarouselProps {
  visibleSlides: number;
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
}

const SimpleCarousel: React.FC<ISimpleCarouselProps> = (
  { visibleSlides, naturalSlideHeight = 1, naturalSlideWidth = 1, children }
) => {
  const totalSlides = (children as any).length;

  return (
    <CarouselProvider
      naturalSlideWidth={naturalSlideWidth}
      naturalSlideHeight={naturalSlideHeight}
      totalSlides={totalSlides}
      visibleSlides={visibleSlides}
    >
      <SimpleCarouselContent visibleSlides={visibleSlides} totalSlides={totalSlides}>
        {children}
      </SimpleCarouselContent>
    </CarouselProvider>
  );
};

export default SimpleCarousel;
