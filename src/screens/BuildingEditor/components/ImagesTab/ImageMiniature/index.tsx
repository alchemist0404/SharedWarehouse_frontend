import React, { useState } from 'react';
import ImageContainer from '@components/ImageContainer';
import styles from './styles.module.scss';
import { Button, Label } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import ImageWrapper from '@screens/BuildingEditor/components/ImagesTab/ImageMiniature/Wrapper';

export interface IImageMiniatureProps {
  src: string;
  onClick: IBindingCallback1<string>;
  onDeleteClick: IBindingAction;
  deleting: boolean;
  setAsAvatar: IBindingAction;
  settingAvatar: boolean;
  isAvatar: boolean;
}

const withStopPropagation = action => ev => {
  action();
  ev.stopPropagation();
};

const ImageMiniature: React.FC<IImageMiniatureProps> = (
  { src, onClick, onDeleteClick, deleting, setAsAvatar, settingAvatar, isAvatar }
) => {
  const [isHovering, setHovering] = useState(false);
  const displayOverlay = isHovering || deleting || settingAvatar;

  return (
    <ImageWrapper
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {isAvatar && (
        <Label corner="left" color="orange" icon="star" title="Current avatar" />
      )}
      <ImageContainer src={src} className={`${styles.image} ${isHovering ? styles.image_hovered : ''}`} />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={`${styles.overlay} ${displayOverlay ? styles.overlay_hovering : ''}`}
        onClick={() => onClick(src)}
      >
        {isAvatar || (
          <Button
            className={styles.btn_set_avatar}
            compact
            circular
            color="orange"
            icon="star"
            onClick={withStopPropagation(setAsAvatar)}
            loading={settingAvatar}
            title="Set as avatar"
          />
        )}
        {isAvatar || (
          <Button
            className={styles.btn_remove}
            compact
            circular
            color="red"
            icon="trash alternate"
            onClick={withStopPropagation(onDeleteClick)}
            loading={deleting}
            title="Delete"
          />
        )}
      </div>
    </ImageWrapper>
  );
};

export default ImageMiniature;
