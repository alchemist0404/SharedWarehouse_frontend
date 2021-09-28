import React from 'react';
import TableWithSchedules from '@screens/NeedsDashboard/DropOffAndPickUp/components/TableWithSchedules';
import { IPageable } from '@models/domain/PageableReducerState';
import { IBindingCallback1 } from '@models/Callbacks';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import {
  extractActiveBookings,
  extractCurrentPage,
  extractFetchActiveBookingsLoading,
  extractPageSize,
  extractTotalPages
} from '@screens/NeedsDashboard/DropOffAndPickUp/reducers';
import { fetchActiveBookingsRoutine, setCurrentPageRoutine } from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { connect } from 'react-redux';
import { ISimpleTableProps } from '@components/SimpleTable';

export interface IBookingsTableProps<BookingDto extends IBookingDetailsForSchedulingDto> extends IActions, IState<BookingDto> {
  tableProps: (bookings: BookingDto[]) => ISimpleTableProps;
}

interface IActions {
  setPage: IBindingCallback1<number>;
  loadBookings: IBindingCallback1<IPageRequest>;
}

export interface IState<BookingDto> extends IPageable {
  bookingsWithDetails: BookingDto[];
  bookingsLoading: boolean;
}

function BookingsTable<BookingDto extends IBookingDetailsForSchedulingDto>(
  {
    setPage, loadBookings, bookingsLoading, page, totalPages, pageSize, tableProps, bookingsWithDetails
  }: IBookingsTableProps<BookingDto>
) {
  return (
    <TableWithSchedules
      bookingsLoading={bookingsLoading}
      totalPages={totalPages}
      page={page}
      setPage={setPage}
      loadBookings={loadBookings}
      pageSize={pageSize}
      tableProps={tableProps(bookingsWithDetails)}
    />
  );
}

const mapStateToProps: (state) => IState<IBookingDetailsForSchedulingDto> = state => ({
  totalPages: extractTotalPages(state),
  page: extractCurrentPage(state),
  pageSize: extractPageSize(state),
  bookingsWithDetails: extractActiveBookings(state),
  bookingsLoading: extractFetchActiveBookingsLoading(state)
});

const mapDispatchToProps: IActions = {
  loadBookings: fetchActiveBookingsRoutine,
  setPage: setCurrentPageRoutine.fulfill
};

export type BookingsTableActions = typeof mapDispatchToProps;

export { BookingsTable };

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTable);
