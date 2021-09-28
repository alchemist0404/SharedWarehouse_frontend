import { all } from 'redux-saga/effects';
import bookingsTableSagas from '@screens/HavesDashboard/DropOffAndPickUp/containers/BookingsTable/sagas';
import bookingModalSagas from '@screens/HavesDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal/sagas';
import schedulesSegmentSagas from '../containers/SchedulesSegment/sagas';

export default function* dropOffAndPickUpSagas() {
  yield all([
    bookingModalSagas(),
    bookingsTableSagas(),
    schedulesSegmentSagas()
  ]);
}
