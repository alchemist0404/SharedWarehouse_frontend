import React, { useState } from 'react';
import styles from './styles.module.scss';
import ImageMiniature from '@screens/BuildingEditor/components/ImagesTab/ImageMiniature';
import AddImageMiniature from '@screens/BuildingEditor/components/ImagesTab/AddImageMiniature';
import ImageUploader from '@screens/BuildingEditor/components/ImagesTab/ImageUploader';
import ExpandedImageModal from '@screens/BuildingEditor/components/ImagesTab/ExpandedImageModal';
import { IImageDto } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IBindingCallback1 } from '@models/Callbacks';
import DeleteConfirm from '@screens/BuildingEditor/components/ImagesTab/DeleteConfirm';
import ImageWrapper from '@screens/BuildingEditor/components/ImagesTab/ImageMiniature/Wrapper';
import ImageContainer from '@components/ImageContainer';

export interface IImagesTabProps {
  images: IImageDto[];
  uploading: boolean;
  uploadImages: IBindingCallback1<FormData>;
  deleteImage: IBindingCallback1<string>;
  uploadError: string;
  setImageAsAvatar: IBindingCallback1<string>;
}

const ImagesTab: React.FC<IImagesTabProps> = (
  { images, uploadImages, uploading, deleteImage, uploadError, setImageAsAvatar }
) => {
  const [expandedImage, setExpandedImage] = useState<string>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [pendingDelete, setPendingDelete] = useState<string>();
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const handlePreviewImages = () => {
    setImagesSrc([]);
    selectedImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event: any) => setImagesSrc(prev => [...prev, event.target.result]
        .filter((val, i, arr) => arr.indexOf(val) === i));
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={styles.container}>
      <DeleteConfirm deleteImage={deleteImage} pendingDelete={pendingDelete} setPendingDelete={setPendingDelete} />
      <ExpandedImageModal expandedImage={expandedImage} setExpandedImage={setExpandedImage} />
      {selectedImages?.length > 0 && (
        <>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            uploading={uploading}
            previewImages={handlePreviewImages}
            uploadImages={uploadImages}
            uploadError={uploadError}
          />
          { !!imagesSrc.length && (
            <div className={styles.prevImages}>
                {Array.isArray(imagesSrc) && imagesSrc.length
                  ? imagesSrc.map((s, i) => (
                    <ImageWrapper key={i}>
                      <ImageContainer className={styles.image} src={s} />
                    </ImageWrapper>
                  ))
                  : null}
            </div>
          )}
        </>
      )}
      <div className={styles.images}>
        {images.slice().sort(((a, b) => {
          const diff = a.index - b.index;
          if (diff === 0) {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          }
          return diff;
        }))
          .map(i => (
            <ImageMiniature
              onClick={setExpandedImage}
              key={i.id}
              src={i.url}
              onDeleteClick={() => setPendingDelete(i.id)}
              deleting={i.deleteLoading}
              setAsAvatar={() => setImageAsAvatar(i.id)}
              settingAvatar={i.setAsAvatarLoading}
              isAvatar={i.avatar}
            />
          ))}
        <AddImageMiniature onImagesSelection={setSelectedImages} />
      </div>
    </div>
  );
};

export default ImagesTab;
