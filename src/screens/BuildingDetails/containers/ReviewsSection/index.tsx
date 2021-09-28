import React from 'react';
import Review from '@screens/BuildingDetails/components/Review';

export interface IReviewSectionProps {
  reviews: string[];
}

const ReviewSection: React.FC<IReviewSectionProps> = ({ reviews }) => (
  <div>
    <h4>Reviews:</h4>
    {reviews.map(r => (<Review key={r} text={r} />))}
  </div>
);

export default ReviewSection;
