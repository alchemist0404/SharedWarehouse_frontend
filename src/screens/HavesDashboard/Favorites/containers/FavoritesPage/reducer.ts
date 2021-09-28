/* eslint-disable max-len */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getInitialPageableState, IPageableReducerState } from '@models/domain/PageableReducerState';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Favorites/routines';
import { IPageableResult } from '@models/domain/PageableResult';
import { tweakPageOnReduce } from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage/reducer';
import { favFailure, favSuccess, favTriggered } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';

export type IFavoritesReducerState = IPageableReducerState<IResultBuildingItem>;

const initialState: IFavoritesReducerState = {
  ...getInitialPageableState<IResultBuildingItem>(), pageSize: 8
};

export const favoritesReducer = createReducer(initialState, {
  [fetchFavoriteBuildingsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPageableResult<IResultBuildingItem>>) => {
    state.items = payload.items;
    state.totalPages = payload.totalPages;
    state.totalResults = payload.totalResults;
    state.page = tweakPageOnReduce(state.page, payload.totalPages);
  },
  [setPageRoutine.FULFILL]: (state, { payload }: PayloadAction<number>) => {
    state.page = payload;
  },
  [toggleFavoriteBuildingRoutine.SUCCESS]: (state, { payload }) => {
    state.items = favSuccess(state.items, payload);
  },
  [toggleFavoriteBuildingRoutine.FAILURE]: (state, { payload }) => {
    state.items = favFailure(state.items, payload);
  },
  [toggleFavoriteBuildingRoutine.TRIGGER]: (state, { payload }) => {
    state.items = favTriggered(state.items, payload);
  }
});
