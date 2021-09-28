import React, { useRef, useState } from 'react';
import { Button, Image, Label, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';
import CircularReactCrop from '@screens/NeedsDashboard/Account/components/CircularReactCrop';

export interface IAvatarEditorFormProps {
  existingAvatarSrc?: string;
  uploadImage: IBindingCallback1<any>;
  loading: boolean;
}

const AvatarEditorForm: React.FC<IAvatarEditorFormProps> = ({ existingAvatarSrc, uploadImage, loading }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string>();
  const [currentFile, setCurrentFile] = useState<string | ArrayBuffer>();
  const [error, setError] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const uploadInput = useRef<HTMLInputElement>();

  const [fileReader] = useState<FileReader>(() => {
    const reader = new FileReader();
    reader.onloadstart = () => {
      setError(undefined);
      setIsUploading(true);
    };
    reader.onloadend = () => setIsUploading(false);
    reader.onload = ev => setCurrentFile(ev.target.result);
    return reader;
  });

  const handleFileInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFile(undefined);
    const { files } = ev.target;
    if (files.length === 0) return;
    if (files.length > 1) {
      setError('Multiple files upload is not supported');
      return;
    }
    const avatarFile = files[0];
    if (!avatarFile.type.startsWith('image/')) {
      setError('Only images supported');
      return;
    }
    setCurrentFileName(avatarFile.name);
    fileReader.readAsDataURL(avatarFile);
  };

  return (
    <>
      <span className={styles.title}>Profile picture</span>
      {error && <Label color="red" basic content={error} />}
      <div className={styles.avatar_container}>
        <Image className={styles.avatar_image} src={existingAvatarSrc} circular />
        <Button
          className={styles.avatar_cover}
          onClick={() => uploadInput.current.click()}
          loading={isUploading || loading}
        />
        <input tabIndex={-1} ref={uploadInput} type="file" onChange={handleFileInputChange} accept="image/*" />
      </div>
      <Modal
        dimmer="blurring"
        open={currentFile !== undefined}
        onClose={() => setCurrentFile(undefined)}
        size="mini"
      >
        <ModalHeader>Confirm your profile picture</ModalHeader>
        <ModalContent className={styles.content}>
          {currentFile && (
            <CircularReactCrop
              fileToCrop={{ fileBase64: currentFile as string, name: currentFileName }}
              onComplete={setCroppedImage}
            />
          )}
        </ModalContent>
        <ModalActions>
          <Button
            content="Cancel"
            onClick={() => setCurrentFile(undefined)}
          />
          <Button
            color="orange"
            content="Confirm"
            onClick={() => {
              uploadImage(croppedImage);
              setCurrentFile(undefined);
            }}
          />
        </ModalActions>
      </Modal>
    </>
  );
};

export default AvatarEditorForm;
