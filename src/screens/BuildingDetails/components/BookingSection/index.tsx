import React, { useCallback, useEffect, useState } from 'react';
import s from '@screens/BuildingDetails/components/DescriptionSection/styles.module.scss';
import styles from './styles.module.scss';
import { times } from 'lodash';
import { Button, Form, FormTextArea, Placeholder, PlaceholderHeader, PlaceholderLine, Popup } from 'semantic-ui-react';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import SpaceItem from '@screens/BuildingDetails/components/SpaceItem';
import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import DatePickerDropdown from '@components/DatePickerDropdown';
import { IBindingCallback1 } from '@models/Callbacks';
import { ISpacesAvailabilityRequest } from '@screens/BuildingDetails/model/SpacesAvailabilityRequest';
import { IBookingRequest, ISpaceToAmount } from '@screens/BuildingDetails/model/BookingRequest';
import { BillingPeriod } from '@models/domain/BillingPeriod';
import { useLocation } from 'react-router-dom';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { ISpaceBooked } from '@screens/BookingCheckout/model/BookingCheckout';

export interface IBookingSectionProps {
  loading: boolean;
  spaces: ISpaceWithAvailability[];
  selectedDates?: IDatesData;
  fetchSpaceAvailability: IBindingCallback1<ISpacesAvailabilityRequest>;
  spacesLoading: boolean;
  requestBooking: IBindingCallback1<IBookingRequest>;
  bookingLoading: boolean;
  className?: string;
}

export interface ILocationState {
  booking?: IBriefBookingDto;
  spaces?: ISpaceBooked[];
}

const BookingSection: React.FC<IBookingSectionProps> = (
  {
    loading, spaces, selectedDates: searchSelectedDates,
    fetchSpaceAvailability, spacesLoading, requestBooking, bookingLoading, className
  }
) => {
  const [selectedSpaces, setSelectedSpaces] = useState<ISpaceToAmount[]>([]);
  const [selectedDates, setSelectedDates] = useState(searchSelectedDates);
  const [notesText, setNotesText] = useState<string>('');
  const location = useLocation<ILocationState>();
  const { state } = location;

  useEffect(() => {
    if (state?.booking) {
      setSelectedDates(prevState => ({
        ...prevState,
        startingDate: new Date(state.booking.startingDate),
        endingDate: state.booking.endingDate ? new Date(state.booking.endingDate) : null
      }));
      setNotesText(state.booking.note);
    }
  }, [location]);

  useEffect(() => {
    if (state?.spaces) {
      setSelectedSpaces(state.spaces
        .map(space => ({ amount: space.amountBooked, spaceTemplateId: space.id })));
    }
  }, [location]);

  const handleSpaceItemClick = (spaceModel: ISpaceToAmount) => {
    setSelectedSpaces(prev => [
      ...prev.filter(selSp => selSp.spaceTemplateId !== spaceModel.spaceTemplateId),
      spaceModel
    ]);
  };

  const handleDatesChange = (dates: IDatesData) => {
    setSelectedDates(dates);
    setSelectedSpaces([]);
    fetchSpaceAvailability({ spaceIds: spaces.map(sp => sp.id), dates });
  };

  const handleBookClick = () => {
    requestBooking({
      billingPeriod: BillingPeriod.MONTHLY,
      dates: selectedDates,
      note: notesText,
      spacesToAmount: selectedSpaces
    });
  };

  const bookingDisabled = useCallback(() => {
    if (selectedSpaces.length === 0) return true;
    return selectedSpaces.map(sp => sp.amount)
      .reduce((prev, curr) => prev + curr) === 0;
  },
  [selectedSpaces]);

  return (
    <div className={className}>
      <h4 className={s.subtitle}>Available spaces:</h4>
      <div className={s.date_picker_container}>
        <DatePickerDropdown value={selectedDates} onChange={handleDatesChange} />
      </div>
      {loading || spacesLoading ? (
        <>
          {times(2, i => (
            <Placeholder key={i}>
              <PlaceholderHeader image>
                <PlaceholderLine />
                <PlaceholderLine />
              </PlaceholderHeader>
              <Placeholder.Paragraph>
                <PlaceholderLine length="medium" />
                <PlaceholderLine length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          ))}
        </>
      ) : (
        <div>
          {spaces.map(sp => (
            <SpaceItem
              key={sp.id}
              space={sp}
              amountSelected={selectedSpaces.find(selSp => (selSp.spaceTemplateId === sp.id))?.amount || 0}
              initialAmount={selectedSpaces.find(selSp => (selSp.spaceTemplateId === sp.id))?.amount || 0}
              onClick={handleSpaceItemClick}
            />
          ))}
        </div>
      )}
      <hr className={s.divider} />
      <h4 className={s.subtitle}>Other needs</h4>
      <h5 className={s.tip}>Any other accommodations? Let us know.</h5>
      <Form>
        <FormTextArea
          placeholder="Other comments"
          disabled={loading}
          onChange={(ev, { value }) => setNotesText(value as string)}
          value={notesText}
        />
      </Form>
      <Popup
        trigger={(
          <div className={styles.book_btn_container}>
            <Button
              color="olive"
              className={styles.book_btn}
              disabled={loading || bookingDisabled()}
              onClick={handleBookClick}
              loading={bookingLoading}
            >
              Book
            </Button>
          </div>
        )}
        content="Need to select at least one space"
        disabled={!bookingDisabled()}
        closeOnTriggerClick={false}
      />
    </div>
  );
};

export default BookingSection;
