import React from 'react';
import { Image, Modal, ModalContent } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';

export interface IExpandedImageModalProps {
  expandedImage: string;
  setExpandedImage: IBindingCallback1<string>;
}

const ExpandedImageModal: React.FC<IExpandedImageModalProps> = ({ expandedImage, setExpandedImage }) => (
  <Modal open={!!expandedImage} onClose={() => setExpandedImage(undefined)} size="large">
    <ModalContent image className={styles.container}>
      <Image src={expandedImage} />
    </ModalContent>
  </Modal>
);

export default ExpandedImageModal;
