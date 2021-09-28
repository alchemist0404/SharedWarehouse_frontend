import React, { useEffect } from 'react';
import s from './styles.module.scss';
import Map from '@screens/BuildingDetails/components/Map';
import Sticky from 'react-stickynode';
import ImageGallery from '@screens/BuildingDetails/components/ImageGallery';
import DescriptionSection from '@screens/BuildingDetails/components/DescriptionSection';
import ScrollToTopOnMount from '@components/ScrollToTop';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  bookSpacesRoutine,
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/BuildingDetails/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  extractAvailableSpacesLoading,
  extractBookSpacesLoading,
  extractBuildingDetails,
  extractBuildingDetailsLoading,
  extractBuildingDetailsSpaces,
  extractToggleFavoriteBuildingLoading
} from '@screens/BuildingDetails/reducers';
import { IBuildingDetailsRequest } from '@screens/BuildingDetails/model/BuildingDetailsRequest';
import { IBuildingForDisplaying, ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { extractQuery } from '@screens/BrowseSpaces/reducers';
import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import { ISpacesAvailabilityRequest } from '@screens/BuildingDetails/model/SpacesAvailabilityRequest';
import { IBookingRequest } from '@screens/BuildingDetails/model/BookingRequest';

export interface IBuildingDetailsPageProps extends IState, IActions {
}

interface IState {
  loading: boolean;
  spacesLoading: boolean;
  building: IBuildingForDisplaying;
  selectedDates: IDatesData;
  bookingLoading: boolean;
  spaces: ISpaceWithAvailability[];
  favoriteLoading: boolean;
}

interface IActions {
  fetchDetails: IBindingCallback1<IBuildingDetailsRequest>;
  fetchSpaceAvailability: IBindingCallback1<ISpacesAvailabilityRequest>;
  requestBooking: IBindingCallback1<IBookingRequest>;
  toggleFavorite: IBindingCallback1<string>;
}

export interface IPassedState {
  buildingName?: string;
}

const BuildingDetailsPage: React.FC<IBuildingDetailsPageProps> = (
  { fetchDetails, loading, building, spaces, selectedDates, fetchSpaceAvailability,
    spacesLoading, requestBooking, bookingLoading, toggleFavorite, favoriteLoading }
) => {
  const { id } = useParams<{id: string}>();
  const passedState: IPassedState | undefined = useHistory().location.state;

  const tempDates = {
    startingDate: selectedDates?.startingDate ?? new Date(),
    endingDate: selectedDates?.endingDate
  };

  useEffect(() => {
    fetchDetails({ id, from: tempDates.startingDate, to: tempDates.endingDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDetails, id]);

  return (
    <>
      <ScrollToTopOnMount />
      <div className={`content_wrapper ${s.root}`}>
        <div id="details__section" className={s.container}>
          <ImageGallery classNames={s.container__images} images={building?.gallery ?? []} loading={loading} />
          <Sticky
            top="#navbar"
            bottomBoundary="#details__section"
          >
            <DescriptionSection
              className={s.container__description}
              previewBuildingName={passedState?.buildingName}
              loading={loading}
              building={building}
              spaces={spaces}
              selectedDates={tempDates}
              fetchSpaceAvailability={fetchSpaceAvailability}
              spacesLoading={spacesLoading}
              requestBooking={requestBooking}
              bookingLoading={bookingLoading}
              likeLoading={favoriteLoading}
              toggleLike={toggleFavorite}
            />
          </Sticky>
        </div>
        {building?.location?.lat && building?.location?.lon && (
          <>
            <h4>Map:</h4>
            <Map
              lat={building.location.lat}
              lon={building.location.lon}
              loading={loading}
              currentBuildingSpaces={spaces}
              currentBuildingName={building?.buildingName}
            />
          </>
        )}
        {/* <div id="reviews">*/}
        {/*  <ReviewSection reviews={times(12, i => (`Test review ${i}`))} />*/}
        {/* </div>*/}
      </div>
    </>
  );
};

const mapDispatchToProps: IActions = {
  fetchDetails: fetchBuildingDetailsRoutine,
  fetchSpaceAvailability: fetchSpaceAvailabilityRoutine,
  requestBooking: bookSpacesRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine
};

const mapStateToProps: (state) => IState = state => ({
  loading: extractBuildingDetailsLoading(state),
  building: extractBuildingDetails(state),
  spaces: extractBuildingDetailsSpaces(state),
  selectedDates: extractQuery(state).dates,
  spacesLoading: extractAvailableSpacesLoading(state),
  bookingLoading: extractBookSpacesLoading(state),
  favoriteLoading: extractToggleFavoriteBuildingLoading(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetailsPage);
