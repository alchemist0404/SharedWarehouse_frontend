import React from 'react';
import s from './styles.module.scss';
import BookingSection from '@screens/BuildingDetails/components/BookingSection';
import { IBuildingForDisplaying, ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import { IBindingCallback1 } from '@models/Callbacks';
import { ISpacesAvailabilityRequest } from '@screens/BuildingDetails/model/SpacesAvailabilityRequest';
import { IBookingRequest } from '@screens/BuildingDetails/model/BookingRequest';
import BuildingName from './components/BuildingName';
import CompanyName from './components/CompanyName';
import BuildingRating from './components/BuildingRating';
import BuildingDescription from './components/BuildingDescription';
import BuildingTags from './components/BuildingTags';
import BackButton from './components/BackButton';
import { useHistory } from 'react-router-dom';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import OwnerEditButton from '@components/OwnerEditButton';

export interface IDescriptionSectionProps {
  className: string;
  loading: boolean;
  previewBuildingName: string;
  building: IBuildingForDisplaying;
  spaces: ISpaceWithAvailability[];
  selectedDates: IDatesData;
  fetchSpaceAvailability: IBindingCallback1<ISpacesAvailabilityRequest>;
  spacesLoading: boolean;
  requestBooking: IBindingCallback1<IBookingRequest>;
  bookingLoading: boolean;
  toggleLike: IBindingCallback1<string>;
  likeLoading: boolean;
}

const DescriptionSection: React.FC<IDescriptionSectionProps> = (
  {
    className, previewBuildingName, loading, building, spaces, selectedDates,
    fetchSpaceAvailability, spacesLoading, requestBooking, bookingLoading, toggleLike, likeLoading
  }
) => {
  const history = useHistory();

  return (
    <div className={`${className} ${s.container}`}>
      <div className={s.top_buttons_container}>
        <div>
          <BackButton text="Back to Browse" action={() => history.push(ENDPOINTS.BROWSE)} />
          <CompanyName loading={loading} building={building} />
        </div>
        <div className={s.filler} />
        <OwnerEditButton
          ownerId={building?.ownerId}
          buttonProps={{ onClick: () => history.push(`/building/edit/${building?.id}`) }}
        />
      </div>
      <BuildingName
        previewBuildingName={previewBuildingName}
        loading={loading}
        building={building}
        toggleLike={toggleLike}
        likeLoading={likeLoading}
      />
      <BuildingRating loading={loading} building={building} />
      <BuildingDescription loading={loading} building={building} />
      <BuildingTags loading={loading} building={building} />
      <h3 className={s.estimation_text}>Get a quick estimate</h3>
      <BookingSection
        loading={loading}
        spaces={spaces}
        selectedDates={selectedDates}
        fetchSpaceAvailability={fetchSpaceAvailability}
        spacesLoading={spacesLoading}
        requestBooking={requestBooking}
        bookingLoading={bookingLoading}
      />
    </div>
  );
};

export default DescriptionSection;
