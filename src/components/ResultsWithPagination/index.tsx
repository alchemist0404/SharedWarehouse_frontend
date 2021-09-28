import React from 'react';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import Pagination from '@components/Pagination';
import { IPageable } from '@models/domain/PageableReducerState';

export interface IResultsWithPaginationProps extends IPageable {
  loading: boolean;
  setPage: IBindingCallback1<number>;
}

const ResultsWithPagination: React.FC<IResultsWithPaginationProps> = (
  { loading, setPage, totalPages, page, children }
) => (
  <div className={styles.container}>
    <div className={styles.results}>
      {children}
    </div>
    {totalPages > 1 && !loading && (
      <Pagination
        totalPages={totalPages}
        setPage={setPage}
        currentPage={page}
      />
    )}
  </div>
);

export default ResultsWithPagination;
