import React from 'react';
import BuildingGridCard from '@screens/BrowseSpaces/components/layouts/cards/BuildingGridCard';
import styles from './styles.module.scss';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { Loader } from 'semantic-ui-react';
import { placeholderSrc } from '@helpers/image.placeholder.helper';
import { IBindingCallback1 } from '@models/Callbacks';
import { searchBrowserBuildingLink } from '@screens/BrowseSpaces/components/layouts/cards/link.helper';
import { LocationDescriptor } from 'history';

export interface IResultGridProps {
  results: IResultBuildingItem[];
  loading: boolean;
  toggleLike: IBindingCallback1<string>;
  linkGenerator?: (item: IResultBuildingItem) => LocationDescriptor;
  itemToMeta?: (item: IResultBuildingItem) => string;
}

const itemToCard = (item: IResultBuildingItem, toggleLike: IBindingCallback1<string>, linkGenerator, itemToMeta) => (
  <BuildingGridCard
    key={item.id}
    imageSrc={item.avatar || placeholderSrc(300, 300)}
    name={item.name}
    meta={itemToMeta(item)}
    linkLocation={linkGenerator(item)}
    liked={item.liked}
    toggleLike={() => toggleLike(item.id)}
    likeLoading={item.likeLoading}
  />
);

const simpleItemMeta = item => item.meta;

const ResultsGrid: React.FC<IResultGridProps> = (
  { results, loading, toggleLike, linkGenerator = searchBrowserBuildingLink, itemToMeta = simpleItemMeta }
) => (
  <>
    <Loader inline="centered" active={loading} />
    {loading || (
    <>
      <div className={styles.grid}>
        {results.map(i => itemToCard(i, toggleLike, linkGenerator, itemToMeta))}
      </div>
    </>
    )}
  </>
);

export default ResultsGrid;
