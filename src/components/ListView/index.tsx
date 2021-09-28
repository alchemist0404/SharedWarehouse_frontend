import { ScheduleStatus } from '@root/models/domain/schedule/ScheduleStatus';
import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import styles from './styles.module.scss';

export interface IListViewProps<T extends { id }> {
  loading: boolean;
  items: T[];
  renderItem: (item: T) => JSX.Element;
  itemToClassName?: (item: T) => string;
  onItemClick: (item: T) => void;
  placeholderText: string;
  placeholderComponent?: JSX.Element;
  renderItemFooter?: (item: T) => JSX.Element;
  itemDisabled?: (item: T) => boolean;
}

function ListView<T extends { id; status? }>(
  { items, loading, renderItem, placeholderText, onItemClick,
    placeholderComponent, itemToClassName, renderItemFooter, itemDisabled }: IListViewProps<T>
) {
  return (
    <>
      <Segment
        className={items.length ? styles.items_segment : undefined}
        placeholder={items.length === 0 || loading}
        loading={loading}
      >
        {!loading && (
          items.length
            ? items.map((sch, index) => (
              <React.Fragment key={sch.id}>
                {index !== 0 && <Divider fitted className={styles.divider} />}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className={`${styles.item_row}
                    ${itemToClassName ? itemToClassName(sch) : ''}
                    ${itemDisabled && itemDisabled(sch)
                    ? styles.disabled
                    : ''}
                    `}
                  onClick={() => onItemClick(sch)}
                >
                  {renderItem(sch)}
                </div>
                {renderItemFooter && renderItemFooter(sch)}
              </React.Fragment>
            )) : (
              <>
                <Header icon>{placeholderText}</Header>
                {placeholderComponent}
              </>
            )
        )}
      </Segment>
    </>
  );
}

export default ListView;
