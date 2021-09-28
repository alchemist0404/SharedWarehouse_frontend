import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

export interface IBackButtonProps {
  text?: string;
  action?: () => void;
  className?: string;
}

const BackButton: React.FC<IBackButtonProps> = ({ text = 'Back', action, className }) => {
  const history = useHistory();

  return (
    <Button
      className={`${styles.btn_back} ${className || ''}`}
      onClick={action || (() => history.goBack())}
      content={text}
    />
  );
};

export default BackButton;
