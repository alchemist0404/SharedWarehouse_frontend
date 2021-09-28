import { all } from 'redux-saga/effects';
import bookingsTableSagas from '@screens/NeedsDashboard/DropOffAndPickUp/containers/BookingsTable/sagas';
import bookingModalSagas from '@screens/NeedsDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal/sagas';

export default function* dropOffAndPickUpSagas() {
  yield all([
    bookingModalSagas(),
    bookingsTableSagas()
  ]);
}
