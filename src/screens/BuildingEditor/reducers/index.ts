import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { buildingEditorReducer } from '@screens/BuildingEditor/containers/BuildingEditorPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */
import {
  createSpaceRoutine,
  deleteImageRoutine,
  fetchBuildingDetailsRoutine,
  fetchTagsRoutine,
  saveBuildingRoutine,
  setAsAvatarRoutine,
  uploadImagesRoutine
} from '@screens/BuildingEditor/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setAsAvatarRequest: reducerCreator([setAsAvatarRoutine.TRIGGER]),
  deleteImageRequest: reducerCreator([deleteImageRoutine.TRIGGER]),
  uploadImagesRequest: reducerCreator([uploadImagesRoutine.TRIGGER]),
  createSpaceRequest: reducerCreator([createSpaceRoutine.TRIGGER]),
  fetchTagsRequest: reducerCreator([fetchTagsRoutine.TRIGGER]),
  saveBuildingRequest: reducerCreator([saveBuildingRoutine.TRIGGER]),
  fetchBuildingDetailsRequest: reducerCreator([fetchBuildingDetailsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: buildingEditorReducer
});

const reqs = (state: RootState) => state.buildingEditor.requests;
const data = (state: RootState) => state.buildingEditor.data;

export const extractBuilding = state => data(state).building;
export const extractSpaceTemplates = state => data(state).spaceTemplates;
export const extractTags = state => data(state).tags;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetAsAvatarLoading = state => reqs(state).setAsAvatarRequest.loading;
export const extractSetAsAvatarError = state => reqs(state).setAsAvatarRequest.error;
export const extractDeleteImageLoading = state => reqs(state).deleteImageRequest.loading;
export const extractDeleteImageError = state => reqs(state).deleteImageRequest.error;
export const extractUploadImagesLoading = state => reqs(state).uploadImagesRequest.loading;
export const extractUploadImagesError = state => reqs(state).uploadImagesRequest.error;
export const extractCreateSpaceLoading = state => reqs(state).createSpaceRequest.loading;
export const extractCreateSpaceError = state => reqs(state).createSpaceRequest.error;
export const extractFetchTagsLoading = state => reqs(state).fetchTagsRequest.loading;
export const extractFetchTagsError = state => reqs(state).fetchTagsRequest.error;
export const extractSaveBuildingLoading = state => reqs(state).saveBuildingRequest.loading;
export const extractSaveBuildingError = state => reqs(state).saveBuildingRequest.error;
export const extractFetchBuildingDetailsLoading = state => reqs(state).fetchBuildingDetailsRequest.loading;
