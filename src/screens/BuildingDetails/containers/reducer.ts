import {
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/BuildingDetails/routines';
import {
  IBuildingDetailsResponse,
  IBuildingDetailsWithAvailability,
  ISpaceWithAvailability
} from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export type IBuildingDetailsReducerState = IBuildingDetailsWithAvailability

const initialState: IBuildingDetailsReducerState = {
  building: undefined,
  spaces: []
};

export function findAndReplaceThenDispose<T>(arr1: T[], arr2: T[], predicate) {
  let arr2Copy = arr2.slice();
  return arr1.map(oldElem => {
    for (let i = 0; i < arr2Copy.length; i += 1) {
      if (predicate(arr2Copy[i], oldElem)) {
        const deletedElem = arr2Copy[i];
        arr2Copy = arr2Copy.filter(el => el !== deletedElem);
        return deletedElem;
      }
    }
    return oldElem;
  });
}

export const buildingDetailsReducer = createReducer(initialState, {
  // eslint-disable-next-line arrow-body-style
  [fetchBuildingDetailsRoutine.SUCCESS]: (draftState, { payload }: PayloadAction<IBuildingDetailsResponse>) => {
    return payload.buildingResult;
  },
  [fetchSpaceAvailabilityRoutine.SUCCESS]: (draftState, { payload }: PayloadAction<ISpaceWithAvailability[]>) => {
    draftState.spaces = findAndReplaceThenDispose(draftState.spaces, payload, (el1, el2) => el1.id === el2.id);
  },
  [toggleFavoriteBuildingRoutine.SUCCESS]: draftState => {
    const draftBuilding = draftState.building;
    draftBuilding.favorite = !draftBuilding.favorite;
  }
});
