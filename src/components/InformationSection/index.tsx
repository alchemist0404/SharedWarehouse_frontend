import React, { useEffect } from 'react';
import { IBindingAction } from '@models/Callbacks';
import { Loader } from 'semantic-ui-react';

export interface IInformationSectionProps<T> {
  title?: string;
  items: T[];
  fetchItems: IBindingAction;
  itemsLoading: boolean;
  renderItem?: (item: T, index: number) => JSX.Element;
  itemsWrapper?: React.FC<IWrapperProps>;
  noItemsPlaceholder?: React.FC;
  loadMoreComponent?: React.FC;
  haveMore?: boolean;
  hideTitle?: boolean;
}

export interface IWrapperProps {
  haveMore?: boolean;
}

export function InformationSection<T>(
  {
    title, items, fetchItems, itemsLoading, loadMoreComponent: LoadMore, haveMore, noItemsPlaceholder: Placeholder,
    itemsWrapper: Wrapper, renderItem, hideTitle
  }: IInformationSectionProps<T>
) {
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!hideTitle && (
        <h2>{title}</h2>
      )}
      <Loader active={itemsLoading} inline="centered" />
      {itemsLoading || (
        <>
          <Wrapper haveMore={haveMore}>
            {items.length === 0 ? <Placeholder /> : items.map(renderItem)}
          </Wrapper>
          {haveMore && LoadMore && <LoadMore />}
        </>
      )}
    </>
  );
}
