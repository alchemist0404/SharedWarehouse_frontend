import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { spaceEditorReducer } from '@screens/SpaceEditor/containers/SpaceEditorPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { hideSpaceRoutine } from '@screens/SpaceEditor/routines';
import { chooseSpaceRoutine } from '@screens/SpaceEditor/routines';
import { saveSpaceRoutine } from '@screens/SpaceEditor/routines';
import { fetchSpacesBySpaceTemplateRoutine } from '@screens/SpaceEditor/routines';
import { fetchSpaceDetailsRoutine, saveSpaceTemplateRoutine } from '@screens/SpaceEditor/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  hideSpaceRequest: reducerCreator([hideSpaceRoutine.TRIGGER]),
  chooseSpaceIdRequest: reducerCreator([chooseSpaceRoutine.TRIGGER]),
  saveSpaceRequest: reducerCreator([saveSpaceRoutine.TRIGGER]),
  fetchSpacesBySpaceTemplateRequest: reducerCreator([fetchSpacesBySpaceTemplateRoutine.TRIGGER]),
  saveSpaceTemplateRequest: reducerCreator([saveSpaceTemplateRoutine.TRIGGER]),
  fetchSpaceDetailsRequest: reducerCreator([fetchSpaceDetailsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: spaceEditorReducer
});

const reqs = (state: RootState) => state.spaceEditor.requests;
const data = (state: RootState) => state.spaceEditor.data;

export const extractSpaceTemplate = state => data(state).spaceTemplate;
export const extractSpaces = state => data(state).spaces;
export const extractChosenSpace = state => data(state).chosenSpace;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractHideSpaceLoading = state => reqs(state).hideSpaceRequest.loading;
export const extractHideSpaceError = state => reqs(state).hideSpaceRequest.error;
export const extractChooseSpaceIdLoading = state => reqs(state).chooseSpaceIdRequest.loading;
export const extractChooseSpaceIdError = state => reqs(state).chooseSpaceIdRequest.error;
export const extractSaveSpaceLoading = state => reqs(state).saveSpaceRequest.loading;
export const extractSaveSpaceError = state => reqs(state).saveSpaceRequest.error;
export const extractFetchSpacesBySpaceTemplateLoading = state => reqs(state).fetchSpacesBySpaceTemplateRequest.loading;
export const extractFetchSpacesBySpaceTemplateError = state => reqs(state).fetchSpacesBySpaceTemplateRequest.error;
export const extractSaveSpaceTemplateLoading = state => reqs(state).saveSpaceTemplateRequest.loading;
export const extractSaveSpaceTemplateError = state => reqs(state).saveSpaceTemplateRequest.error;
export const extractFetchSpaceDetailsLoading = state => reqs(state).fetchSpaceDetailsRequest.loading;
export const extractFetchSpaceDetailsError = state => reqs(state).fetchSpaceDetailsRequest.error;
