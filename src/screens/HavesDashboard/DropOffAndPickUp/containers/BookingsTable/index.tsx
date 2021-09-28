import {
  BookingsTable,
  BookingsTableActions,
  IBookingsTableProps,
  IState as IBookingsTableState
} from '@screens/NeedsDashboard/DropOffAndPickUp/containers/BookingsTable';
import { connect } from 'react-redux';
import {
  extractActiveBookings,
  extractCurrentPage,
  extractFetchActiveBookingsLoading,
  extractPageSize,
  extractTotalPages
} from '@screens/HavesDashboard/DropOffAndPickUp/reducers';
import { fetchActiveBookingsRoutine, setCurrentPageRoutine } from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { IBookingDetailsForSchedulingWithPerson } from '@screens/HavesDashboard/DropOffAndPickUp/model/BookingDetailsForSchedulingWithPerson';

const mapStateToProps: (state) => IBookingsTableState<IBookingDetailsForSchedulingWithPerson> = state => ({
  totalPages: extractTotalPages(state),
  page: extractCurrentPage(state),
  pageSize: extractPageSize(state),
  bookingsWithDetails: extractActiveBookings(state),
  bookingsLoading: extractFetchActiveBookingsLoading(state)
});

const mapDispatchToProps: BookingsTableActions = {
  loadBookings: fetchActiveBookingsRoutine,
  setPage: setCurrentPageRoutine.fulfill
};

const HavesBookingsTable = (props: IBookingsTableProps<IBookingDetailsForSchedulingWithPerson>) => (
  BookingsTable<IBookingDetailsForSchedulingWithPerson>(props)
);

export default connect(mapStateToProps, mapDispatchToProps)(HavesBookingsTable);
