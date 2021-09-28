import React from 'react';
import { IInformationSectionProps, InformationSection } from '@components/InformationSection';
import { placeholderSrc } from '@helpers/image.placeholder.helper';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { toPrice } from '@helpers/price.helper';
import BuildingGridCard from '@screens/BrowseSpaces/components/layouts/cards/BuildingGridCard';
import { IBindingCallback1 } from '@models/Callbacks';
import { dashboardBuildingLink } from '@screens/BrowseSpaces/components/layouts/cards/link.helper';
import { useHistory, useLocation } from 'react-router-dom';
import OptionalSimpleCarousel from '@components/OptionalSimpleCarousel';
import { Button } from 'semantic-ui-react';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';

export function lowestPriceMeta({ lowestPrice }: IResultBuildingItem) {
  if (lowestPrice) {
    return `Starting at ${toPrice({
      amount: lowestPrice.amount * 31,
      currency: lowestPrice.currency
    })} monthly`;
  }
  return 'No available spaces';
}

const spaceToItem = (result: IResultBuildingItem, toggleLike, location) => (
  <div key={result.id} style={{ maxWidth: '22em', width: '95%', maxHeight: '95%' }}>
    <BuildingGridCard
      key={result.id}
      imageSrc={result.avatar || placeholderSrc(250, 205)}
      name={result.name}
      meta={lowestPriceMeta(result)}
      liked={result.liked}
      toggleLike={() => toggleLike(result.id)}
      likeLoading={result.likeLoading}
      linkLocation={dashboardBuildingLink(result, location)}
    />
  </div>
);

const wrapper: React.FC = ({ children }) => (
  <OptionalSimpleCarousel visibleSlides={3}>{children}</OptionalSimpleCarousel>
);

export interface ISpacesSectionProps extends IInformationSectionProps<IResultBuildingItem> {
  toggleLike: IBindingCallback1<string>;
}

const SpacesSection: React.FC<ISpacesSectionProps> = (
  {
    title = 'My shared spaces',
    itemsWrapper = wrapper,
    renderItem = spaceToItem,
    toggleLike,
    ...props
  }
) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <InformationSection
      {...props}
      title={title}
      itemsWrapper={itemsWrapper}
      renderItem={item => renderItem(item, toggleLike, location)}
      noItemsPlaceholder={() => <div>No items</div>}
      loadMoreComponent={() => (
        <Button
          content="Load more..."
          attached="bottom"
          onClick={() => history.push(HAVES_DASHBOARD_ENDPOINTS.BUILDINGS)}
        />
      )}
    />
  );
};

export default SpacesSection;
