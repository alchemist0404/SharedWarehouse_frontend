import React from 'react';
import BuildingListCard from '@screens/BrowseSpaces/components/layouts/cards/BuildingListCard';
import { IResultGridProps } from '@screens/BrowseSpaces/components/layouts/ResultsGrid';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { Loader } from 'semantic-ui-react';
import { placeholderSrc } from '@helpers/image.placeholder.helper';
import { IBindingCallback1 } from '@models/Callbacks';
import { searchBrowserBuildingLink } from '@screens/BrowseSpaces/components/layouts/cards/link.helper';

export type IResultListProps = IResultGridProps;

const itemToCard = (item: IResultBuildingItem, toggleLike: IBindingCallback1<string>) => (
  <BuildingListCard
    key={item.id}
    imageSrc={item.avatar || placeholderSrc(300, 150)}
    name={item.name}
    meta={item.meta}
    linkLocation={searchBrowserBuildingLink(item)}
    liked={item.liked}
    toggleLike={() => toggleLike(item.id)}
    likeLoading={item.likeLoading}
  />
);

const ResultsList: React.FC<IResultListProps> = ({ results, loading, toggleLike }) => (
  <>
    <Loader inline="centered" active={loading} />
    {loading || results.map(i => itemToCard(i, toggleLike))}
  </>
);

export default ResultsList;

