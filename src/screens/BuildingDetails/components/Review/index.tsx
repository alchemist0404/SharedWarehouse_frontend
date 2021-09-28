import React from 'react';

export interface IReviewProps {
  text: string;
}

const Review: React.FC<IReviewProps> = ({ text }) => (
  <div style={{ backgroundColor: 'lightgreen', border: '1px dotted black', height: '100px' }}>
    {text}
  </div>
);

export default Review;
