import React, { useEffect } from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { connect } from 'react-redux';
import { RootState } from '@root/store';
import { IBindingCallback1 } from '@models/Callbacks';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import {
  extractBuildings,
  extractCurrentPage,
  extractFetchFavoriteBuildingsLoading,
  extractPageSize,
  extractTotalPages
} from '@screens/NeedsDashboard/Favorites/reducers';
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Favorites/routines';
import { IPageable } from '@models/domain/PageableReducerState';
import ResultGridWithPagination from '@components/ResultGridWithPagination';

export interface IFavoritesProps extends IPageable {
  loadBuildings: IBindingCallback1<IPageRequest>;
  buildings: IResultBuildingItem[];
  buildingsLoading: boolean;
  toggleFavorite: IBindingCallback1<string>;
  setPage: IBindingCallback1<number>;
}

const Favorites: React.FC<IFavoritesProps> = (
  { buildings, buildingsLoading, page, totalPages, setPage, toggleFavorite, loadBuildings, pageSize }
) => {
  useEffect(() => {
    if (loadBuildings) {
      loadBuildings({ page, size: pageSize });
    }
  }, [loadBuildings, page, pageSize]);

  return (
    <div className={common.container}>
      <h1>My favorites</h1>
      <h2>List of your favorite spaces</h2>
      <ResultGridWithPagination
        items={buildings}
        loading={buildingsLoading}
        page={page}
        setPage={setPage}
        toggleFavorite={toggleFavorite}
        totalPages={totalPages}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  buildings: extractBuildings(state),
  buildingsLoading: extractFetchFavoriteBuildingsLoading(state),
  page: extractCurrentPage(state),
  totalPages: extractTotalPages(state),
  pageSize: extractPageSize(state)
});

const mapDispatchToProps = {
  loadBuildings: fetchFavoriteBuildingsRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine,
  setPage: setPageRoutine.fulfill
};

export type IFavoritesState = typeof mapStateToProps;
export type IFavoritesActions = typeof mapDispatchToProps;
export { Favorites };

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
