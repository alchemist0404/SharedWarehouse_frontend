import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface IImageProps {
  alt: string;
  thumb: string;
  src: string;
}

const LazyLoadingImage: React.FC<IImageProps> = (
  { alt, thumb, src }
) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        const { naturalHeight, naturalWidth } = imgRef.current;
        setHorizontal(naturalWidth > naturalHeight);
      };
    }
  }, []);

  return (
    <>
      <img
        className={`${styles.image} ${styles.thumb}`}
        alt={alt}
        src={thumb}
        style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
      />
      <img
        ref={imgRef}
        onLoad={() => {
          setIsLoaded(true);
        }}
        className={`${styles.image} ${styles.full} ${horizontal ? styles.horizontal : styles.vertical}`}
        style={{ opacity: isLoaded ? 1 : 0 }}
        alt={alt}
        src={src}
      />
    </>
  );
};

export default LazyLoadingImage;
