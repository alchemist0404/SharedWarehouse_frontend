import React from 'react';
import styles from './styles.module.scss';
import { PageLayout } from '@screens/BrowseSpaces/model/PageLayout';
import ResultsList from '@screens/BrowseSpaces/components/layouts/ResultsList';
import ResultsGrid from '@screens/BrowseSpaces/components/layouts/ResultsGrid';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { IBindingCallback1 } from '@models/Callbacks';
import Pagination from '@root/components/Pagination';
import { IPageable } from '@models/domain/PageableReducerState';

export interface ISearchResultsProps extends IPageable {
  layout: PageLayout;
  results: IResultBuildingItem[];
  loading: boolean;
  setPage: IBindingCallback1<number>;
  toggleFavorite: IBindingCallback1<string>;
}

const SearchResults: React.FC<ISearchResultsProps> = (
  { layout, totalPages, page, results, loading, setPage, toggleFavorite }
) => (
  <div className={styles.container}>
    <div className={styles.results}>
      {totalPages === 0 ? (
        <h1>No results</h1>
      ) : (
        <>
          {layout === PageLayout.LIST && (
            <ResultsList
              results={results}
              loading={loading}
              toggleLike={toggleFavorite}
            />
          )}
          {layout === PageLayout.GRID && (
            <ResultsGrid
              results={results}
              loading={loading}
              toggleLike={toggleFavorite}
            />
          )}
        </>
      )}
    </div>
    {totalPages !== 0 && !loading && (
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    )}
  </div>
);

export default SearchResults;
