import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { IBuildingForDisplaying, ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import {
  extractBuildingDetails,
  extractFetchBuildingDetailsLoading,
  extractFetchSpaceAvailabilityLoading,
  extractRequestBookingLoading,
  extractSpaces,
  extractToggleFavoriteBuildingLoading
} from '@screens/NeedsDashboard/BuildingDetails/reducers';
import {
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  requestBookingRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BuildingDetails/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import CompanyName from '@screens/BuildingDetails/components/DescriptionSection/components/CompanyName';
import BuildingName from '@screens/BuildingDetails/components/DescriptionSection/components/BuildingName';
import { IPassedState } from '@screens/BuildingDetails/containers/BuildingDetailsPage';
import BuildingRating from '@screens/BuildingDetails/components/DescriptionSection/components/BuildingRating';
import BuildingDescription from '@screens/BuildingDetails/components/DescriptionSection/components/BuildingDescription';
import BuildingTags from '@screens/BuildingDetails/components/DescriptionSection/components/BuildingTags';
import { IBuildingDetailsRequest } from '@screens/BuildingDetails/model/BuildingDetailsRequest';
import BackButton from '@screens/BuildingDetails/components/DescriptionSection/components/BackButton';
import Map from '@screens/BuildingDetails/components/Map';
import BookingSection from '@screens/BuildingDetails/components/BookingSection';
import { ISpacesAvailabilityRequest } from '@screens/BuildingDetails/model/SpacesAvailabilityRequest';
import { IBookingRequest } from '@screens/BuildingDetails/model/BookingRequest';
import ImageGalleryCarousel from '@screens/NeedsDashboard/BuildingDetails/components/ImageGalleryCarousel';
import ScrollToTopOnMount from '@components/ScrollToTop';
import OwnerEditButton from '@components/OwnerEditButton';

export interface IBuildingDetailsProps extends IState, IActions {
}

interface IState {
  loading: boolean;
  building: IBuildingForDisplaying | undefined;
  spaces: ISpaceWithAvailability[];
  spacesLoading: boolean;
  bookingLoading: boolean;
  favoriteLoading: boolean;
}

interface IActions {
  loadBuilding: IBindingCallback1<IBuildingDetailsRequest>;
  fetchSpaceAvailability: IBindingCallback1<ISpacesAvailabilityRequest>;
  requestBooking: IBindingCallback1<IBookingRequest>;
  toggleFavorite: IBindingCallback1<string>;
}

const BuildingDetails: React.FC<IBuildingDetailsProps> = (
  {
    loading, building, loadBuilding, spaces,
    fetchSpaceAvailability, spacesLoading, bookingLoading, requestBooking, toggleFavorite, favoriteLoading
  }
) => {
  const location = useLocation();
  const history = useHistory();
  const { building: buildingId } = parse(location.search);
  const passedState: IPassedState | undefined = history.location.state;

  useEffect(() => {
    if (buildingId) {
      loadBuilding({ id: buildingId as string, from: new Date() });
    }
  }, [buildingId, loadBuilding]);

  return (
    <div className={styles.container}>
      <ScrollToTopOnMount />
      <div className={styles.top_buttons_container}>
        <div>
          <BackButton text="Back to Dashboard" className={styles.btn_back} />
          <CompanyName loading={loading} building={building} />
        </div>
        <div className={styles.filler} />
        <OwnerEditButton
          ownerId={building?.ownerId}
          buttonProps={{ onClick: () => history.push(`/building/edit/${buildingId}`) }}
        />
      </div>
      <BuildingName
        toggleLike={toggleFavorite}
        likeLoading={favoriteLoading}
        loading={loading}
        previewBuildingName={passedState?.buildingName}
        building={building}
      />
      <BuildingRating loading={loading} building={building} />
      <BuildingDescription loading={loading} building={building} />
      <BuildingTags loading={loading} building={building} />
      <ImageGalleryCarousel
        className={styles.image_container}
        images={building?.gallery ?? []}
        loading={loading}
        building={building}
      />
      <BookingSection
        className={styles.booking_margin}
        loading={loading}
        spaces={spaces}
        fetchSpaceAvailability={fetchSpaceAvailability}
        spacesLoading={spacesLoading}
        requestBooking={requestBooking}
        bookingLoading={bookingLoading}
      />
      {building?.location?.lat && building.location.lon && (
        <>
          <h4>Map:</h4>
          <Map
            lat={building?.location?.lat}
            lon={building?.location?.lon}
            loading={loading}
            currentBuildingSpaces={spaces}
            currentBuildingName={building?.buildingName}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  loading: extractFetchBuildingDetailsLoading(state),
  building: extractBuildingDetails(state),
  spaces: extractSpaces(state),
  spacesLoading: extractFetchSpaceAvailabilityLoading(state),
  bookingLoading: extractRequestBookingLoading(state),
  favoriteLoading: extractToggleFavoriteBuildingLoading(state)
});

const mapDispatchToProps: IActions = {
  loadBuilding: fetchBuildingDetailsRoutine,
  fetchSpaceAvailability: fetchSpaceAvailabilityRoutine,
  requestBooking: requestBookingRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
