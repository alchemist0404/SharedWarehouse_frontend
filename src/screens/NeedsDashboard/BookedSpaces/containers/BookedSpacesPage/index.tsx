import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  fetchBookedBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BookedSpaces/routines';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import {
  extractBuildings,
  extractFetchMyBookedSpacesLoading,
  extractPage,
  extractPageSize,
  extractTotalPages
} from '@screens/NeedsDashboard/BookedSpaces/reducers';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IPageable } from '@models/domain/PageableReducerState';
import ResultGridWithPagination from '@components/ResultGridWithPagination';

export interface IBookedSpacesProps extends IPageable {
  loadBuildings: IBindingCallback1<IPageRequest>;
  buildings: IResultBuildingItem[];
  buildingsLoading: boolean;
  toggleFavorite: IBindingCallback1<string>;
  setPage: IBindingCallback1<number>;
}

const BookedSpaces: React.FC<IBookedSpacesProps> = (
  { loadBuildings, buildings, buildingsLoading, toggleFavorite, page, setPage, pageSize, totalPages }
) => {
  useEffect(() => {
    if (loadBuildings) {
      loadBuildings({ page, size: pageSize });
    }
  }, [loadBuildings, page, pageSize]);

  return (
    <div className={common.container}>
      <h1>My spaces</h1>
      <h2>Spaces that you have booked</h2>
      <ResultGridWithPagination
        setPage={setPage}
        loading={buildingsLoading}
        items={buildings}
        page={page}
        toggleFavorite={toggleFavorite}
        totalPages={totalPages}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  buildings: extractBuildings(state),
  buildingsLoading: extractFetchMyBookedSpacesLoading(state),
  page: extractPage(state),
  pageSize: extractPageSize(state),
  totalPages: extractTotalPages(state)
});

const mapDispatchToProps = {
  loadBuildings: fetchBookedBuildingsRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine,
  setPage: setPageRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(BookedSpaces);
