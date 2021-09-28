import React from 'react';
import styles from './styles.module.scss';
import useIntersectionObserver from '@root/hooks/use-intersection-observer';
import LazyLoadingImage from '@components/Image';

export interface IImageContainerProps {
  src?: string;
  alt?: string;
  onIsVisible?: () => void;
  className?: string;
}

const ImageContainer: React.FC<IImageContainerProps> = (
  { src, alt, onIsVisible, className }
) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          if (onIsVisible) onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    }
  });

  return (
    <div
      ref={ref}
      className={`${styles.image_container} ${className ?? ''}`}
    >
      {isVisible && <LazyLoadingImage src={src} thumb={src} alt={alt} />}
    </div>
  );
};

export default ImageContainer;
