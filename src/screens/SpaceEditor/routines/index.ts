/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createSpaceEditorRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`SPACE_EDITOR:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const hideSpaceRoutine = createSpaceEditorRoutine('HIDE_SPACE');
export const chooseSpaceRoutine = createSpaceEditorRoutine('CHOOSE_SPACE_ID');
export const saveSpaceRoutine = createSpaceEditorRoutine('SAVE_SPACE');
export const fetchSpacesBySpaceTemplateRoutine = createSpaceEditorRoutine('FETCH_SPACES_BY_SPACE_TEMPLATE');
export const saveSpaceTemplateRoutine = createSpaceEditorRoutine('SAVE_SPACE_TEMPLATE');
export const fetchSpaceDetailsRoutine = createSpaceEditorRoutine('FETCH_SPACE_DETAILS');
