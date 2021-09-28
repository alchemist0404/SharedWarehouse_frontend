import React from 'react';
import styles from './styles.module.scss';
import { Pagination as SemanticPagination } from 'semantic-ui-react';

export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<IPaginationProps> = (
  { totalPages, currentPage, setPage, className }
) => (
  <SemanticPagination
    className={`${styles.pagination} ${className || ''}`}
    totalPages={totalPages}
    activePage={currentPage}
    secondary
    pointing
    firstItem={null}
    lastItem={null}
    size="mini"
    onPageChange={(event, { activePage }) => setPage(activePage as number)}
  />
);

export default Pagination;
