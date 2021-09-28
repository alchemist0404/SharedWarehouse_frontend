import React, { useEffect } from 'react';
import SearchBar from '@screens/BrowseSpaces/containers/SearchBar';
import LayoutSelector from '@screens/BrowseSpaces/components/LayoutSelector';
import styles from './styles.module.scss';
import SearchResults from '@screens/BrowseSpaces/components/SearchResults';
import { PageLayout } from '@screens/BrowseSpaces/model/PageLayout';
import { connect } from 'react-redux';
import {
  extractCurrentPage,
  extractPageLayout,
  extractPageSize,
  extractQuery,
  extractResults,
  extractSearchLoading,
  extractTotalPages,
  extractTotalResults
} from '@screens/BrowseSpaces/reducers';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import {
  clearFiltersRoutine,
  performSearchRoutine,
  setPageIndexRoutine,
  setPageLayoutRoutine,
  setPageSizeRoutine,
  toggleFavoriteBuildingRoutine,
  updateSearchQueryRoutine
} from '@screens/BrowseSpaces/routines';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IQueryData } from '@screens/BrowseSpaces/model/QueryData';
import { IPageable } from '@models/domain/PageableReducerState';

export interface IBrowseSpacesPageProps extends IPageable {
  activeLayout: PageLayout;
  results: IResultBuildingItem[];
  searchLoading: boolean;
  currentPage: number;
  searchQuery: IQueryData;

  setLayout: IBindingCallback1<PageLayout>;
  setPageSize: IBindingCallback1<PageSize>;
  setPage: IBindingCallback1<number>;
  performSearch: IBindingAction;
  toggleFavorite: IBindingCallback1<string>;
  clearFilters: IBindingAction;
  updateFilters: IBindingCallback1<IQueryData>;
}

const BrowseSpacesPage: React.FC<IBrowseSpacesPageProps> = (
  {
    results, activeLayout, currentPage, pageSize, searchLoading, totalPages,
    totalResults, searchQuery, setLayout, setPageSize, setPage, performSearch, toggleFavorite,
    clearFilters, updateFilters
  }
) => {
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  return (
    <div className={`${styles.container} content_wrapper`}>
      <SearchBar
        searchLoading={searchLoading}
        performSearch={performSearch}
        searchQuery={searchQuery}
        clearFilters={clearFilters}
        updateFilters={updateFilters}
      />
      <div className={styles.layout_selector_wrapper}>
        <LayoutSelector
          resultsNumber={totalResults}
          activeLayout={activeLayout}
          pageSize={pageSize}
          setLayout={setLayout}
          setPageSize={setPageSize}
        />
      </div>
      <SearchResults
        results={results}
        layout={activeLayout}
        loading={searchLoading}
        page={currentPage}
        totalPages={totalPages}
        setPage={setPage}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  activeLayout: extractPageLayout(state),
  results: extractResults(state),
  searchLoading: extractSearchLoading(state),
  pageSize: extractPageSize(state),
  currentPage: extractCurrentPage(state),
  totalPages: extractTotalPages(state),
  totalResults: extractTotalResults(state),
  searchQuery: extractQuery(state)
});

const mapDispatchToProps = {
  setLayout: setPageLayoutRoutine.fulfill,
  setPageSize: setPageSizeRoutine.fulfill,
  setPage: setPageIndexRoutine.fulfill,
  performSearch: performSearchRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine,
  clearFilters: clearFiltersRoutine.fulfill,
  updateFilters: updateSearchQueryRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseSpacesPage);
