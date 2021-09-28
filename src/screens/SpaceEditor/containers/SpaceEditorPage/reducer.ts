import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import {
  chooseSpaceRoutine,
  fetchSpaceDetailsRoutine,
  fetchSpacesBySpaceTemplateRoutine, hideSpaceRoutine,
  saveSpaceTemplateRoutine, saveSpaceRoutine
} from '@screens/SpaceEditor/routines';
import { ISpaceDto } from '@screens/SpaceEditor/models/ISpaceDto';

export interface ISpaceEditorReducerState {
  spaceTemplate: ISpaceTemplateDto;
  spaces?: ISpaceDto[];
  chosenSpace?: Partial<ISpaceDto>;
}

const initialState: ISpaceEditorReducerState = {
  spaceTemplate: undefined
};

export const spaceEditorReducer = createReducer(initialState, {
  [fetchSpaceDetailsRoutine.SUCCESS]: (state, { payload }: PayloadAction<ISpaceTemplateDto>) => {
    state.spaceTemplate = payload;
  },
  [fetchSpacesBySpaceTemplateRoutine.SUCCESS]: (state, { payload }: PayloadAction<ISpaceDto[]>) => {
    state.spaces = payload;
  },
  [saveSpaceTemplateRoutine.SUCCESS]: (state, { payload }: PayloadAction<ISpaceTemplateDto>) => {
    state.spaceTemplate = payload;
  },
  [saveSpaceRoutine.SUCCESS]: (state, { payload }: PayloadAction<ISpaceDto>) => {
    const index = state.spaces.findIndex(s => s.id === payload.id);
    if (index !== -1) {
      state.spaces[index] = payload;
    } else {
      state.spaces = [payload, ...state.spaces];
    }
  },
  [chooseSpaceRoutine.FULFILL]: (state, { payload }: PayloadAction<Partial<ISpaceDto>>) => {
    state.chosenSpace = payload;
  },
  [hideSpaceRoutine.FULFILL]: state => {
    state.chosenSpace = undefined;
  }
});
