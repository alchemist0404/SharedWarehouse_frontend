import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Button } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IBookingWithSpaces } from '@screens/BookingCheckout/model/BookingCheckout';
import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { placeholderSrc } from '@helpers/image.placeholder.helper';
import ImageContainer from '@components/ImageContainer';
import { extractBookingData, extractBuildingData, extractToggleFavoriteLoading } from '@screens/BookingCheckout/reducers';
import { toggleFavoriteRoutine } from '@screens/BookingCheckout/routines';
import { connect } from 'react-redux';
import MapsLink from '@root/screens/BookingCheckout/components/BookingDetails/MapsLink';
import HostedByLabel from '@screens/BookingCheckout/components/BookingDetails/HostedByLabel';
import Rating from '@screens/BookingCheckout/components/BookingDetails/Rating';
import TagsContainer from '@screens/BookingCheckout/components/BookingDetails/TagsContainer';
import DatesInfo from '@screens/BookingCheckout/components/BookingDetails/DatesInfo';
import LinkToBuildingDetails from '@screens/BookingCheckout/components/BookingDetails/LinkToBuildingDetails';
import BuildingTitle from '@screens/BookingCheckout/components/BookingDetails/BuildingTitle';
import CostEstimation from '@screens/BookingCheckout/components/BookingDetails/CostEstimation';
import OtherNeedsNotes from '@screens/BookingCheckout/components/BookingDetails/OtherNeedsNotes';

export interface IBookingDetailsProps extends IState, IActions {
  proceedToNextStep: IBindingAction;
}

interface IState {
  bookingWithSpaces: IBookingWithSpaces;
  building: IBuildingForDisplaying;
  loadingFavorite: boolean;
}

interface IActions {
  toggleFavorite: IBindingCallback1<string>;
}
export interface IBookingDetailsLocationState {
  prevPath?: string;
  search?: string;
}

const BookingDetailsCheckoutStep: React.FC<IBookingDetailsProps> = (
  { bookingWithSpaces, building, toggleFavorite, loadingFavorite, proceedToNextStep }
) => {
  const location = useLocation<IBookingDetailsLocationState>();
  const [notesText, setNotesText] = useState('');
  const [prevPath, setPrevPath] = useState('');
  const { booking, spaces } = bookingWithSpaces || {};

  useEffect(() => {
    setNotesText(booking?.note);
  }, [booking]);

  useEffect(() => {
    setPrevPath(location.state.prevPath);
  }, [location]);

  return (
    <div className={s.details__container}>
      <div className={s.details__left}>
        <ImageContainer
          className={s.details__image}
          src={building?.avatar || placeholderSrc(300, 210)}
        />
        <MapsLink building={building} />
        <HostedByLabel companyName={building?.companyName} />
        <Rating rating={building?.rating} />
        <TagsContainer tags={building?.tags || []} />
        <DatesInfo booking={booking} />
      </div>
      <div className={s.details__right}>
        <LinkToBuildingDetails id={building?.id} />
        <BuildingTitle buildingName={building?.buildingName} />
        <h3 className={s.details__address}>{building?.location.address}</h3>
        <CostEstimation spaces={spaces || []} bookingCostPerDay={booking?.costPerDay} />
        <Link
          to={{
            pathname: prevPath,
            state: {
              booking,
              spaces
            },
            search: location.state.search
          }}
          className={s.editLink}
        >
          Edit
        </Link>
        <OtherNeedsNotes notesText={notesText} setNotesText={setNotesText} />
        <div className={s.details__buttons}>
          <Button
            color="orange"
            onClick={proceedToNextStep}
          >
            Confirm Booking
          </Button>
          <Button
            color="olive"
            basic
            onClick={() => toggleFavorite(building?.id)}
            loading={loadingFavorite}
          >
            <b>{building?.favorite ? 'REMOVE FROM FAVORITES' : 'SAVE TO FAVORITES'}</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BookingDetailsCheckoutStep };

const mapStateToProps: (state) => IState = state => ({
  building: extractBuildingData(state),
  bookingWithSpaces: extractBookingData(state),
  loadingFavorite: extractToggleFavoriteLoading(state)
});

const mapDispatchToProps: IActions = {
  toggleFavorite: toggleFavoriteRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailsCheckoutStep);
