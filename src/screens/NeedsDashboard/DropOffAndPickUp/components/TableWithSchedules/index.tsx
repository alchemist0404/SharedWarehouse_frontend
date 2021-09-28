import React, { useEffect } from 'react';
import SimpleTable, { ISimpleTableProps } from '@components/SimpleTable';
import ResultsWithPagination from '@components/ResultsWithPagination';
import { IBindingCallback1 } from '@models/Callbacks';
import { Loader } from 'semantic-ui-react';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IPageable } from '@models/domain/PageableReducerState';

export interface ITableWithSchedulesProps extends IPageable {
  bookingsLoading: boolean;
  setPage: IBindingCallback1<number>;
  tableProps: ISimpleTableProps;
  loadBookings: IBindingCallback1<IPageRequest>;
}

const TableWithSchedules: React.FC<ITableWithSchedulesProps> = (
  { totalPages, page, bookingsLoading, tableProps, setPage, loadBookings, pageSize }
) => {
  useEffect(() => {
    loadBookings({ page, size: pageSize });
  }, [loadBookings, page, pageSize]);

  return (
    <>
      {bookingsLoading && <Loader active inline="centered" />}
      {!bookingsLoading && (
        <ResultsWithPagination loading={bookingsLoading} setPage={setPage} totalPages={totalPages} page={page}>
          <SimpleTable {...tableProps} />
        </ResultsWithPagination>
      )}
    </>
  );
};

export default TableWithSchedules;
