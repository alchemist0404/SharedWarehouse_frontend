import React, { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

export interface ICircularReactCropProps {
  onComplete: (file: Blob) => void;
  fileToCrop: IFile;
}

interface IFile {
  fileBase64: string;
  name: string;
}

const CircularReactCrop: React.FC<ICircularReactCropProps> = (
  { fileToCrop: { fileBase64, name: fileName }, onComplete }
) => {
  const [currentCrop, setCurrentCrop] = useState<Crop>({
    aspect: 1,
    unit: '%',
    height: 100
  });
  const [currentImage, setCurrentImage] = useState<HTMLImageElement>();

  function getCroppedImg(image, crop): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        // eslint-disable-next-line no-param-reassign
        (blob as any).name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  const handleCropComplete = async crop => {
    if (currentImage) {
      return onComplete(await getCroppedImg(currentImage, crop));
    }
    return null;
  };

  // This effect is used to re-render the cropped image once it's loaded.
  // Because handleCropComplete func is triggered with outdated version of currentImage at first call after image load,
  // it needs to be manually called once currentImage refreshes it's value
  useEffect(() => {
    handleCropComplete(currentCrop).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return (
    <ReactCrop
      src={fileBase64}
      crop={currentCrop}
      onChange={setCurrentCrop}
      onImageLoaded={setCurrentImage}
      circularCrop
      onComplete={handleCropComplete}
      keepSelection
    />
  );
};

export default CircularReactCrop;
