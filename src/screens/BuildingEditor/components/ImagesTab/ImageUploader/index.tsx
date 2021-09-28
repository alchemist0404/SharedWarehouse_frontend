import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import { IBindingCallback1, IBindingAction } from '@models/Callbacks';

export interface IImageUploaderProps {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  uploading: boolean;
  previewImages: IBindingAction;
  uploadImages: IBindingCallback1<FormData>;
  uploadError: string;
}

const ImageUploader: React.FC<IImageUploaderProps> = (
  { selectedImages, setSelectedImages, uploading, uploadImages, uploadError, previewImages }
) => {
  const [localError, setLocalError] = useState(uploadError);
  const [localUploading, setLocalUploading] = useState(uploading);

  const handleUploadClick = () => {
    const formData = new FormData();
    selectedImages.forEach(file => formData.append('files', file));
    uploadImages(formData);
  };

  useEffect(() => {
    setLocalError(uploadError);
  }, [uploadError]);

  useEffect(() => {
    setLocalError(undefined);
  }, [selectedImages]);

  useEffect(() => {
    if (!uploading && !uploadError && localUploading) {
      setSelectedImages([]);
    }
    setLocalUploading(uploading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploading]);

  return (
    <Segment className={styles.container}>
      <Header size="medium">Images to upload</Header>
      {localError && <Label color="red" basic className={styles.error}>{localError}</Label>}
      {uploading || (
        <div className={styles.file_selection}>
          <Label basic>
            {`Selected ${selectedImages.length} file(s).`}
          </Label>
          {Array.from(selectedImages).map((img, index) => (
            <Label
              color="blue"
              key={img.name}
              className={styles.file_label}
              onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
            >
              {img.name}
            </Label>
          ))}
        </div>
      )}
      <Button
        color="orange"
        icon="cloud upload"
        labelPosition="left"
        content="Upload"
        loading={uploading}
        onClick={handleUploadClick}
      />
      <Button
        color="green"
        icon="image"
        labelPosition="left"
        content="Preview"
        onClick={previewImages}
      />
    </Segment>
  );
};

export default ImageUploader;
