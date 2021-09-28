import React from 'react';
import { Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';

export interface IErrorPopupProps {
  open: boolean;
  label: string;
  component: JSX.Element;
  position?: IPopupPosition;
}

export type IPopupPosition = 'top left'
  | 'top right'
  | 'bottom right'
  | 'bottom left'
  | 'right center'
  | 'left center'
  | 'top center'
  | 'bottom center';

const ErrorPopup: React.FC<IErrorPopupProps> = ({ open, label, component, position }) => (
  <Popup
    className={styles.popup}
    open={open}
    content={label}
    on={[]}
    size="tiny"
    hideOnScroll
    flowing
    pinned={false}
    position={position || 'right center'}
    trigger={component}
  />
);

export default ErrorPopup;
