import React, { useState } from 'react';
import { ImageProps } from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import { Image, Modal, ModalContent } from 'semantic-ui-react';
import styles from './styles.module.scss';

export type IZoomableImageProps = ImageProps

const ZoomableImage: React.FC<IZoomableImageProps> = ({ className, ...props }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      onOpen={() => setShowModal(true)}
      trigger={(<Image {...props} className={`${styles.image} ${className || ''}`} />)}
    >
      <ModalContent onClick={() => setShowModal(false)}>
        <Image {...props} size="massive" />
      </ModalContent>
    </Modal>
  );
};

export default ZoomableImage;
