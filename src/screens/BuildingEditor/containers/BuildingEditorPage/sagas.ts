import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  createSpaceRoutine,
  deleteImageRoutine,
  fetchBuildingDetailsRoutine,
  fetchTagsRoutine,
  saveBuildingRoutine,
  setAsAvatarRoutine,
  uploadImagesRoutine
} from '@screens/BuildingEditor/routines';
import { Routine } from 'redux-saga-routines';
import buildingService, {
  IBuildingImageActionRequest,
  IBuildingImagesUploadRequest
} from '@screens/BuildingEditor/services/building.service';
import { toastr } from 'react-redux-toastr';
import tagsService from '@screens/BuildingEditor/services/tags.service';
import { PayloadAction } from '@reduxjs/toolkit';
import spaceTemplatesService from '@screens/BuildingEditor/services/space_templates.service';
import { history } from '@helpers/history.helper';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import { ISpaceTemplateCreationRequest } from '@screens/BuildingEditor/model/SpaceTemplateCreation';

function* tryFetchBuildingDetails({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingService.fetchBuildingDetails, payload);
    yield put(fetchBuildingDetailsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load building details', e?.message);
    yield put(fetchBuildingDetailsRoutine.failure(e?.message));
  }
}

function* tryFetchTags() {
  try {
    const resp = yield call(tagsService.fetchAllTags);
    yield put(fetchTagsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load tags', e?.message);
    yield put(fetchTagsRoutine.failure(e?.message));
  }
}

function* trySaveBuildingData({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingService.saveBuildingData, payload);
    toastr.success('Success', 'Building information saved!');
    yield put(saveBuildingRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t save building', e?.message);
    yield put(saveBuildingRoutine.failure(e?.message));
  }
}

function* tryCreateSpace({ payload }: PayloadAction<ISpaceTemplateCreationRequest>) {
  try {
    const respId = yield call(spaceTemplatesService.createTemplate, payload);
    toastr.success('Success', 'Space has been created!');
    yield put(createSpaceRoutine.success());
    history.push(ENDPOINTS.SPACE_EDITOR(respId));
  } catch (e) {
    toastr.error('Can\'t create the space', e?.message);
    yield put(createSpaceRoutine.failure(e?.message));
  }
}

function* tryUploadImages({ payload }: PayloadAction<IBuildingImagesUploadRequest>) {
  try {
    const resp = yield call(buildingService.uploadImages, payload);
    yield put(uploadImagesRoutine.success(resp));
    toastr.success('Success', 'Images have been uploaded');
  } catch (e) {
    toastr.error('Can\'t upload images', e?.message);
    yield put(uploadImagesRoutine.failure(e?.message));
  }
}

function* tryDeleteImage({ payload }: PayloadAction<IBuildingImageActionRequest>) {
  try {
    yield call(buildingService.deleteImage, payload);
    toastr.success('Success', 'Image deleted');
    yield put(deleteImageRoutine.success(payload));
  } catch (e) {
    toastr.error('Can\'t delete image', e?.message);
    yield put(deleteImageRoutine.failure(payload));
  }
}

function* trySetImageAsAvatar({ payload }: PayloadAction<IBuildingImageActionRequest>) {
  try {
    yield call(buildingService.setImageAsAvatar, payload);
    toastr.success('Success', 'Avatar has been set');
    yield put(setAsAvatarRoutine.success(payload));
  } catch (e) {
    toastr.error('Can\'t set image as avatar', e?.message);
    yield put(setAsAvatarRoutine.failure(payload));
  }
}

export default function* buildingEditorPageSagas() {
  yield all([
    yield takeEvery(fetchBuildingDetailsRoutine.TRIGGER, tryFetchBuildingDetails),
    yield takeEvery(fetchTagsRoutine.TRIGGER, tryFetchTags),
    yield takeEvery(saveBuildingRoutine.TRIGGER, trySaveBuildingData),
    yield takeEvery(createSpaceRoutine.TRIGGER, tryCreateSpace),
    yield takeEvery(uploadImagesRoutine.TRIGGER, tryUploadImages),
    yield takeEvery(deleteImageRoutine.TRIGGER, tryDeleteImage),
    yield takeEvery(setAsAvatarRoutine.TRIGGER, trySetImageAsAvatar)
  ]);
}
