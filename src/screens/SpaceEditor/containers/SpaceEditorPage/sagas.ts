import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  fetchSpaceDetailsRoutine,
  fetchSpacesBySpaceTemplateRoutine, hideSpaceRoutine,
  saveSpaceTemplateRoutine, saveSpaceRoutine
} from '@screens/SpaceEditor/routines';
import { PayloadAction } from '@reduxjs/toolkit';
import templatesService from '@screens/SpaceEditor/service/space_templates.service';
import { toastr } from 'react-redux-toastr';
import { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';
import spacesService from '@screens/SpaceEditor/service/space.service';
import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';
import { extractChosenSpace, extractSpaceTemplate } from '@screens/SpaceEditor/reducers';

function* tryFetchSpaceDetails({ payload }: PayloadAction<string>) {
  try {
    const resp = yield call(templatesService.fetchSpaceTemplateDetails, payload);
    yield put(fetchSpaceDetailsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load space details', e?.message);
    yield put(fetchSpaceDetailsRoutine.failure(e?.message));
  }
}

export interface ISaveRequest {
  id: string;
  data: ISpaceTemplateModificationRequest;
}

function* trySaveSpaceTemplate({ payload: { id, data } }: PayloadAction<ISaveRequest>) {
  try {
    const resp = yield call(templatesService.updateSpaceTemplate, id, data);
    toastr.success('Success!', 'Space has been saved');
    yield put(saveSpaceTemplateRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t save space details', e?.message);
    yield put(saveSpaceTemplateRoutine.failure(e?.message));
  }
}

function* tryFetchSpacesBySpaceTemplate({ payload }: PayloadAction<string>) {
  try {
    const resp = yield call(spacesService.fetchSpacesBySpaceTemplate, payload);
    yield put(fetchSpacesBySpaceTemplateRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t fetch spaces', e?.message);
    yield put(fetchSpacesBySpaceTemplateRoutine.failure(e?.message));
  }
}

function* trySaveSpace({ payload }: PayloadAction<ISpaceEdit>) {
  try {
    const template = yield select(extractSpaceTemplate);
    const chosenSpace = yield select(extractChosenSpace);
    const resp = chosenSpace?.id
      ? yield call(spacesService.updateSpace, { ...payload, id: chosenSpace.id })
      : yield call(spacesService.createSpace, { ...payload, spaceTemplateId: template.id });
    yield put(saveSpaceRoutine.success(resp));
    toastr.success('Success', 'Space saved successfully');
    yield put(hideSpaceRoutine.fulfill());
  } catch (e) {
    toastr.error('Can\'t save space', e?.message);
    yield put(saveSpaceRoutine.failure(e?.message));
  }
}

export default function* spaceEditorPageSagas() {
  yield all([
    yield takeEvery(fetchSpaceDetailsRoutine.TRIGGER, tryFetchSpaceDetails),
    yield takeEvery(saveSpaceTemplateRoutine.TRIGGER, trySaveSpaceTemplate),
    yield takeEvery(fetchSpacesBySpaceTemplateRoutine.TRIGGER, tryFetchSpacesBySpaceTemplate),
    yield takeEvery(saveSpaceRoutine.TRIGGER, trySaveSpace)
  ]);
}
