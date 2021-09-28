/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { ISpaceTemplateCreationRequest } from '@screens/BuildingEditor/model/SpaceTemplateCreation';
import {
  IBuildingImageActionRequest,
  IBuildingImagesUploadRequest
} from '@screens/BuildingEditor/services/building.service';

const createBuildingEditorRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`BUILDING_EDITOR:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setAsAvatarRoutine = createBuildingEditorRoutine<IBuildingImageActionRequest>('SET_AS_AVATAR');
export const deleteImageRoutine = createBuildingEditorRoutine<IBuildingImageActionRequest>('DELETE_IMAGE');
export const uploadImagesRoutine = createBuildingEditorRoutine<IBuildingImagesUploadRequest>('UPLOAD_IMAGES');
export const createSpaceRoutine = createBuildingEditorRoutine<ISpaceTemplateCreationRequest>('CREATE_SPACE');
export const fetchTagsRoutine = createBuildingEditorRoutine('FETCH_TAGS');
export const saveBuildingRoutine = createBuildingEditorRoutine('SAVE_BUILDING');
export const fetchBuildingDetailsRoutine = createBuildingEditorRoutine('FETCH_BUILDING_DETAILS');
