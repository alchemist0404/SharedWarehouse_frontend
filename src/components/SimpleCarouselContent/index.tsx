import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ButtonBack, ButtonNext, CarouselContext, Dot, Slider } from 'pure-react-carousel';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';

export interface ISimpleCarouselContentProps {
  visibleSlides: number;
  totalSlides: number;
}

const SimpleCarouselContent: React.FC<ISimpleCarouselContentProps> = (
  { visibleSlides, totalSlides, children }
) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <>
      <div className={styles.carousel}>
        <ButtonBack className={styles.button_back}>
          <Icon
            name="angle left"
            color={currentSlide === 0 ? 'grey' : 'orange'}
            size="huge"
            className={styles.angle_icon}
          />
        </ButtonBack>
        <Slider className={styles.slider}>
          {children}
        </Slider>
        <ButtonNext className={styles.button_next}>
          <Icon
            name="angle right"
            color={currentSlide === totalSlides - visibleSlides ? 'grey' : 'orange'}
            size="huge"
            className={styles.angle_icon}
          />
        </ButtonNext>
      </div>
      <div className={styles.dot_array}>
        {_.times(totalSlides - visibleSlides + 1).map(index => (
          <Dot
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active_dot : ''}`}
            slide={index}
            disabled={false}
          />
        ))}
      </div>
    </>
  );
};

export default SimpleCarouselContent;
