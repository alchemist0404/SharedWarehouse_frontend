import React from 'react';
import s from './styles.module.scss';

export interface IRatingProps {
  rating?: string;
  reviews?: number;
}

const Rating: React.FC<IRatingProps> = ({ rating, reviews }) => (
  <p className={s.reviews}>
    {rating ? (
      <>
        <b>{`${rating} / 5`}</b>
        {` STARS BASED ON ${reviews} REVIEWS`}
      </>
    ) : (
      <>
        No reviews yet
      </>
    )}
  </p>
);

export default Rating;
