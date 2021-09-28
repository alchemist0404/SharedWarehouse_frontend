import React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

export interface ILikeButtonProps extends ButtonProps {
  liked: boolean;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ liked, className, ...props }) => (
  <Button
    {...props}
    icon={liked ? 'heart' : 'heart outline'}
    className={`${liked ? styles.like_button__active : styles.like_button} ${className}`}
  />
);

export default LikeButton;
