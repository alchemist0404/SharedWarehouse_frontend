/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import ListView, { IListViewProps } from '@components/ListView';

export interface IAdditiveListViewProps<T extends { id }> extends IListViewProps<T> {
  onAddClick: () => void;
  addingDisabled?: boolean;
}

function AdditiveListView<T extends { id; status? }>(
  { onAddClick, loading, items, addingDisabled, ...props }: IAdditiveListViewProps<T>
) {
  const AddButton = useCallback(() => (
    addingDisabled
      ? <div />
      : (
        <Button
          content="Add"
          icon="plus"
          color="orange"
          labelPosition="left"
          onClick={onAddClick}
        />
      )
  ), [addingDisabled, onAddClick]);

  return (
    <>
      {(!loading && items.length > 0) && <AddButton />}
      <ListView {...props} loading={loading} items={items} placeholderComponent={<AddButton />} />
    </>
  );
}

export default AdditiveListView;
