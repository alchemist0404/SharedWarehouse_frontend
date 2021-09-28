import React, { useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import ImageWrapper from '@screens/BuildingEditor/components/ImagesTab/ImageMiniature/Wrapper';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';

export interface IAddImageMiniatureProps {
  onImagesSelection: IBindingCallback1<File[]>;
}

const AddImageMiniature: React.FC<IAddImageMiniatureProps> = ({ onImagesSelection }) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleFilesSelection = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onImagesSelection(Array.from(ev.target.files));
    window.scrollTo(0, 0);
    ev.target.value = null;
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFilesSelection}
        multiple
        style={{ visibility: 'hidden', position: 'absolute' }}
        accept="image/*"
      />
      <ImageWrapper
        className={styles.add_image}
        onClick={() => inputRef.current.click()}
      >
        <Icon name="image outline" />
        <span>Add image</span>
      </ImageWrapper>
    </>
  );
};

export default AddImageMiniature;
