import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import { Loader } from 'semantic-ui-react';
import { BookingStatus } from '@models/domain/BookingStatus';
import BookingCheckout from '@screens/BookingCheckout/containers/BookingCheckoutPage';
import { IBookingCheckoutData } from '@screens/BookingCheckout/model/BookingCheckout';
import { loadBookingDetailsRoutine } from '@screens/BookingCheckout/routines';
import { extractBookingDetails, extractLoadBookingDetailsLoading } from '@screens/BookingCheckout/reducers';
import BookingDetailsPage from '@screens/BookingCheckout/containers/BookingDetailsPage';

export interface IBookingDetailsProps extends IState, IActions {
}

interface IState {
  bookingLoading: boolean;
  bookingDetails: IBookingCheckoutData;
}

interface IActions {
  loadBooking: IBindingCallback1<string>;
}

const BookingRootPage: React.FC<IBookingDetailsProps> = (
  { loadBooking, bookingDetails, bookingLoading }
) => {
  const { id: bookingId } = useParams<{id: string}>();
  useEffect(() => {
    loadBooking(bookingId);
  }, [bookingId, loadBooking]);

  return (
    <>
      {bookingLoading && <Loader active inline="centered" />}
      {!bookingLoading && bookingDetails && (
        bookingDetails.booking.booking.status === BookingStatus.PENDING ? (
          <BookingCheckout />
        ) : (
          <BookingDetailsPage />
        )
      )}
    </>
  );
};

const mapStateToProps: (state) => IState = state => ({
  bookingLoading: extractLoadBookingDetailsLoading(state),
  bookingDetails: extractBookingDetails(state)
});

const mapDispatchToProps: IActions = {
  loadBooking: loadBookingDetailsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingRootPage);
