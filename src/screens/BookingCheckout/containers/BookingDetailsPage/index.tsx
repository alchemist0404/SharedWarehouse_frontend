import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';
import ImageContainer from '@components/ImageContainer';
import { placeholderSrc } from '@helpers/image.placeholder.helper';
import MapsLink from '@screens/BookingCheckout/components/BookingDetails/MapsLink';
import HostedByLabel from '@screens/BookingCheckout/components/BookingDetails/HostedByLabel';
import Rating from '@screens/BookingCheckout/components/BookingDetails/Rating';
import TagsContainer from '@screens/BookingCheckout/components/BookingDetails/TagsContainer';
import DatesInfo from '@screens/BookingCheckout/components/BookingDetails/DatesInfo';
import LinkToBuildingDetails from '@screens/BookingCheckout/components/BookingDetails/LinkToBuildingDetails';
import BuildingTitle from '@screens/BookingCheckout/components/BookingDetails/BuildingTitle';
import { Button, Label } from 'semantic-ui-react';
import { IBookingWithSpaces } from '@screens/BookingCheckout/model/BookingCheckout';
import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import {
  extractBookingData,
  extractBuildingData,
  extractToggleFavoriteLoading
} from '@screens/BookingCheckout/reducers';
import { toggleFavoriteRoutine } from '@screens/BookingCheckout/routines';
import styles from './styles.module.scss';
import TransactionsBlock from './TransactionsBlock';
import PaymentBlock from './PaymentBlock';

export type IBookingDetailsPageProps = IState & IActions;

interface IState {
  bookingWithSpaces: IBookingWithSpaces;
  building: IBuildingForDisplaying;
  loadingFavorite: boolean;
}

interface IActions {
  toggleFavorite: IBindingCallback1<string>;
}

const BookingDetailsPage: React.FC<IBookingDetailsPageProps> = (
  {
    building, toggleFavorite, bookingWithSpaces, loadingFavorite
  }
) => (
  <div className={`content_wrapper ${s.details__container}`}>
    <div className={s.details__left}>
      <ImageContainer
        className={s.details__image}
        src={building?.avatar || placeholderSrc(300, 210)}
      />
      <MapsLink building={building} />
      <HostedByLabel companyName={building?.companyName} />
      <Rating rating={building?.rating} />
      <TagsContainer tags={building?.tags || []} />
      <DatesInfo booking={bookingWithSpaces.booking} />
    </div>
    <div className={s.details__right}>
      <LinkToBuildingDetails id={building?.id} />
      <BuildingTitle buildingName={building?.buildingName} />
      <h3 className={styles.address}>{building?.location.address}</h3>
      <div className={styles.buttons_container}>
        <Button
          color="olive"
          basic
          onClick={() => toggleFavorite(building?.id)}
          loading={loadingFavorite}
        >
          <b>{building?.favorite ? 'REMOVE FROM FAVORITES' : 'SAVE TO FAVORITES'}</b>
        </Button>
      </div>
      <h4 className={styles.booked_spaces_title}>BOOKED SPACES</h4>
      {bookingWithSpaces.spaces.map(sp => (
        <h3 key={sp.id} className={styles.space_label}>
          {sp.alias}
          &nbsp;
          <b>{`x${sp.amountBooked}`}</b>
        </h3>
      ))}
      {(bookingWithSpaces.booking.stripeSubscriptionId || bookingWithSpaces.booking.paypalSubscriptionId) ? (
        <>
          <h4>SUBSCRIPTION</h4>
          {bookingWithSpaces.booking.stripeSubscriptionId && (
            <a
              href={`https://dashboard.stripe.com/test/subscriptions/${bookingWithSpaces.booking.stripeSubscriptionId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Label color="purple" content="Stripe" />
            </a>
          )}
          {bookingWithSpaces.booking.paypalSubscriptionId && (
            <Label color="blue" content="Paypal sub" />
          )}
        </>
      ) : (
        <PaymentBlock bookingId={bookingWithSpaces.booking.id} />
      )}
      <TransactionsBlock bookingId={bookingWithSpaces.booking.id} className={styles.transactions_section} />
    </div>
  </div>
);

const mapStateToProps: (state) => IState = state => ({
  building: extractBuildingData(state),
  bookingWithSpaces: extractBookingData(state),
  loadingFavorite: extractToggleFavoriteLoading(state)
});

const mapDispatchToProps: IActions = {
  toggleFavorite: toggleFavoriteRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailsPage);
