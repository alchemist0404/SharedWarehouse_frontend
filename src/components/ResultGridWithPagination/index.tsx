import React from 'react';
import ResultsWithPagination, { IResultsWithPaginationProps } from '@components/ResultsWithPagination';
import ResultsGrid from '@screens/BrowseSpaces/components/layouts/ResultsGrid';
import { dashboardBuildingLink } from '@screens/BrowseSpaces/components/layouts/cards/link.helper';
import { lowestPriceMeta } from '@screens/NeedsDashboard/Dashboard/components/SpacesSection';
import { useLocation } from 'react-router-dom';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IResultGridWithPaginationProps extends IResultsWithPaginationProps {
  items: IResultBuildingItem[];
  toggleFavorite: IBindingCallback1<string>;
}

const ResultGridWithPagination: React.FC<IResultGridWithPaginationProps> = (
  { totalPages, items, loading, toggleFavorite, ...props }
) => {
  const location = useLocation();

  return (
    <ResultsWithPagination {...props} totalPages={totalPages} loading={loading}>
      {(totalPages === 0 && !loading) ? (
        <h3>No results</h3>
      ) : (
        <ResultsGrid
          results={items}
          loading={loading}
          toggleLike={toggleFavorite}
          linkGenerator={item => dashboardBuildingLink(item, location)}
          itemToMeta={item => lowestPriceMeta(item)}
        />
      )}
    </ResultsWithPagination>
  );
};

export default ResultGridWithPagination;
