import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteImageRoutine,
  fetchBuildingDetailsRoutine,
  fetchTagsRoutine,
  saveBuildingRoutine,
  setAsAvatarRoutine,
  uploadImagesRoutine
} from '@screens/BuildingEditor/routines';
import { IBuildingDetailsWithSpaces } from '@screens/BuildingEditor/model/BuildingDetails';
import { IBuildingForEditing, IImageDto } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { ITagDto } from '@screens/BuildingEditor/model/Tag';
import { IBuildingImageActionRequest } from '@screens/BuildingEditor/services/building.service';

export interface IBuildingEditorReducerState {
  building: IBuildingForEditing;
  spaceTemplates: ISpaceTemplateDto[];
  tags: string[];
}

const initialState: IBuildingEditorReducerState = {
  building: undefined,
  spaceTemplates: [],
  tags: []
};

export const buildingEditorReducer = createReducer(initialState, {
  [fetchBuildingDetailsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IBuildingDetailsWithSpaces>) => {
    state.building = payload.building;
    state.spaceTemplates = payload.spaceTemplates;
  },
  [fetchTagsRoutine.SUCCESS]: (state, { payload }: PayloadAction<ITagDto[]>) => {
    state.tags = payload.map(t => t.name);
  },
  [saveBuildingRoutine.SUCCESS]: (state, { payload }: PayloadAction<IBuildingForEditing>) => {
    state.building = payload;
  },
  [uploadImagesRoutine.SUCCESS]: (state, { payload }: PayloadAction<IImageDto[]>) => {
    state.building.images = payload;
  },
  [deleteImageRoutine.TRIGGER]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    state.building.images.find(img => img.id === imageId).deleteLoading = true;
  },
  [deleteImageRoutine.SUCCESS]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    const index = state.building.images.findIndex(img => img.id === imageId);
    state.building.images.splice(index, 1);
  },
  [deleteImageRoutine.FAILURE]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    state.building.images.find(img => img.id === imageId).deleteLoading = false;
  },
  [setAsAvatarRoutine.TRIGGER]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    state.building.images.find(img => img.id === imageId).setAsAvatarLoading = true;
  },
  [setAsAvatarRoutine.SUCCESS]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    state.building.images.forEach(img => {
      if (img.id === imageId) {
        img.setAsAvatarLoading = false;
        img.avatar = true;
      } else if (img.avatar) {
        img.avatar = false;
      }
    });
  },
  [setAsAvatarRoutine.FAILURE]: (state, { payload: { imageId } }: PayloadAction<IBuildingImageActionRequest>) => {
    state.building.images.find(img => img.id === imageId).setAsAvatarLoading = false;
  }
});
