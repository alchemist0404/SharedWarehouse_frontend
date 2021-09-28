import React from 'react';

// https://medium.com/frontend-digest/progressively-loading-images-in-react-107cb075417a
const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px'
}) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold
    });
    const { current } = target;
    observer.observe(current);
    return () => {
      observer.unobserve(current);
    };
  });
};

export default useIntersectionObserver;
