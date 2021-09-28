import { callApi } from '@helpers/api.helper';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';

const buildingService = {
  fetchBuildingDetails: (id: string) => callApi({
    method: 'GET',
    endpoint: `buildings/${id}`
  }),
  saveBuildingData: ({ id, building }: IBuildingSaveRequest) => callApi({
    method: 'PATCH',
    endpoint: `buildings/${id}`,
    requestData: building
  }),
  uploadImages: ({ id, formData }: IBuildingImagesUploadRequest) => callApi({
    method: 'POST',
    endpoint: `buildings/${id}/images/upload`,
    formData
  }),
  deleteImage: ({ buildingId, imageId }: IBuildingImageActionRequest) => callApi({
    method: 'DELETE',
    endpoint: `buildings/${buildingId}/image/${imageId}`
  }),
  setImageAsAvatar: ({ buildingId, imageId }: IBuildingImageActionRequest) => callApi({
    method: 'PUT',
    endpoint: `buildings/${buildingId}/avatar/${imageId}`
  })
};

export interface IBuildingSaveRequest {
  id: string;
  building: IBuildingForSave;
}

export interface IBuildingImagesUploadRequest {
  id: string;
  formData: FormData;
}

export interface IBuildingImageActionRequest {
  buildingId: string;
  imageId: string;
}

export default buildingService;
