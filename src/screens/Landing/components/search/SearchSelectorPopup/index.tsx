import React from 'react';
import { Popup } from 'semantic-ui-react';
import { PopupProps } from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import styles from './styles.module.scss';

export type ISearchSelectorPopupProps = PopupProps

const SearchSelectorPopup: React.FC<ISearchSelectorPopupProps> = ({ ...props }) => (
  <Popup
    {...props}
    position="bottom center"
    on={[]}
    className={styles.container}
  />
);

export default SearchSelectorPopup;
