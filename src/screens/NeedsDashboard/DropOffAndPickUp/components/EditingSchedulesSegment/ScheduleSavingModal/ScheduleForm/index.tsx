import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Form, FormGroup, FormSelect, FormTextArea } from 'semantic-ui-react';
import { ScheduleType, scheduleTypeOptions, schTypeKey } from '@models/domain/schedule/ScheduleType';
import { IBindingCallback1 } from '@models/Callbacks';
import TimePicker from '@components/TimePicker';
import styles from './styles.module.scss';
import _ from 'lodash';
import { nilAreEqual } from '@screens/NeedsDashboard/Account/components/AccountDetailsForm';
import { scheduleToForm, toUTCTime } from './utils';
import ExistingScheduleInfo from './ExistingScheduleInfo';
import SemanticDatePicker from '@components/SemanticDatePicker';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { ISpaceToAmount } from '@screens/BuildingDetails/model/BookingRequest';
import { ScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import { DateUtils } from 'react-day-picker';
import {
  IBookingDetailsForSchedulingDto,
  ITemplate2Amount
} from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import moment from 'moment';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import SpacePickUpBlock from '@screens/NeedsDashboard/DropOffAndPickUp/components/SpacePickUpBlock';
import { IScheduleSpaceNoteDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleSpaceNoteDto';
import SpaceDropOffBlock from '@screens/NeedsDashboard/DropOffAndPickUp/components/SpaceDropOffBlock';
import { IScheduleSpaceRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';

export interface IScheduleFormProps {
  save: IBindingCallback1<IFormValues>;
  saveLoading: boolean;
  editedSchedule?: IScheduleResponseDto;
  initialValuesLoading: boolean;
  availableSpaces: ISpaceWithAvailability[];
  updateAvailableSpaces: IBindingCallback1<Date>;
  className?: string;
  bookingDetails?: IBookingDetailsForSchedulingDto;
  existsAnotherActiveDropOff?: boolean;
  existsAnotherActivePickUp?: boolean;
  filledSpaces: IScheduleSpaceNoteDto[];
  templatesWithSpaces: ITemplate2Amount[];
}

export interface IFormValues {
  time: string;
  date: Date;
  type: ScheduleType;
  status: ScheduleStatus;
  address1: string;
  address2: string;
  city: string;
  state: string;
  notes: string;
  allSpaces: boolean;
  spaces: IScheduleSpaceRequest[];
}

const defaultFormValues: IFormValues = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  type: undefined,
  spaces: [],
  allSpaces: false,
  status: undefined,
  notes: '',
  time: '12:00',
  date: new Date()
};

const calculateNewRequestsAfterDropOffUpdate = (
  spaces: IScheduleSpaceRequest[], availableSpaces: ISpaceWithAvailability[],
  templatesWithSpaces: ITemplate2Amount[], templateId: string, spacesNotes: string[]
) => {
  const currentTemplateWithSpaces = templatesWithSpaces
    .find(t => t.spaceTemplate.id === templateId);
  const spacesWithoutCurrentTemplate = spaces
    .filter(space => !currentTemplateWithSpaces.spaceIds.includes(space.spaceId));
  const currentTemplateWithAvailableSpaceIds = availableSpaces
    .find(s => s.id === templateId);

  return [
    ...spacesWithoutCurrentTemplate,
    ...spacesNotes.map((note, i) => ({
      spaceId: currentTemplateWithAvailableSpaceIds.spaceIdsAvailable[i],
      note
    }))
  ];
};

const ScheduleForm: React.FC<IScheduleFormProps> = (
  {
    saveLoading, save, initialValuesLoading, className, editedSchedule,
    availableSpaces, updateAvailableSpaces, bookingDetails, existsAnotherActiveDropOff,
    existsAnotherActivePickUp, filledSpaces, templatesWithSpaces
  }
) => {
  const initialValues = useMemo(() => (
    editedSchedule?.id ? scheduleToForm(editedSchedule) : defaultFormValues
  ), [editedSchedule]);
  const isEditing = useMemo(() => (editedSchedule?.id), [editedSchedule]);
  const ableToUpdate = useMemo(() => (editedSchedule?.status === ScheduleStatus.PENDING), [editedSchedule]);
  const [values, setValues] = useState<IFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);
  useEffect(() => {
    if (values.date && values.time && values.type) {
      updateAvailableSpaces(toUTCTime(values.date, values.time));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.time, values.date, values.type]);

  const handleDropOffSelect = useCallback((spaceModel: ISpaceToAmount) => {
    setValues(prev => (
      {
        ...prev,
        spaces: calculateNewRequestsAfterDropOffUpdate(
          prev.spaces, availableSpaces, templatesWithSpaces, spaceModel.spaceTemplateId, spaceModel.spacesNotes
        )
      }));
  }, [availableSpaces, templatesWithSpaces]);

  const handlePickUpUpdate = useCallback((request: IScheduleSpaceRequest) => {
    setValues(prev => (
      {
        ...prev,
        spaces: [...prev.spaces.filter(space => space.spaceId !== request.spaceId), request]
      }));
  }, []);

  const handlePickUpDelete = useCallback((spaceId: string) => {
    setValues(prev => (
      {
        ...prev,
        spaces: prev.spaces.filter(space => space.spaceId !== spaceId)
      }));
  }, [setValues]);

  const formDisabled = values as any === {}
    || _.isEqualWith(values, initialValues, nilAreEqual)
    || !values.spaces.length;

  const bookingEndDate = bookingDetails.booking.endingDate;
  const bookingEndMoment = bookingEndDate && moment(bookingEndDate, 'YYYY-MM-DD');

  const conflict = (values.type === schTypeKey(ScheduleType.PICK_UP) && existsAnotherActivePickUp)
    || (values.type === schTypeKey(ScheduleType.DROP_OFF) && existsAnotherActiveDropOff);

  const formVisible = (!isEditing || ableToUpdate) && !conflict;

  return (
    <Form
      className={`${styles.form} ${className ?? ''}`}
      onSubmit={() => {
        if (!formDisabled) save(values);
      }}
      loading={initialValuesLoading}
    >
      <>
        {isEditing ? (
          <ExistingScheduleInfo formValues={editedSchedule} />
        ) : (
          <FormSelect
            options={scheduleTypeOptions}
            label="Drop off or pick up?"
            value={values?.type}
            onChange={(event, { value }) => {
              setValues(prev => ({ ...prev, type: value as any, spaces: [] }));
            }}
          />
        )}
        {conflict && (
          <div className={styles.exists}>There is already an active schedule with such type.</div>
        )}
        {formVisible && values.type && (
          <>
            <FormGroup widths="equal">
              <TimePicker
                timePickerProps={{
                  value: values.time,
                  onChange: val => setValues(prev => ({ ...prev, time: val as string }))
                }}
                semanticProps={{ label: 'Pick time' }}
              />
              <SemanticDatePicker
                semanticProps={{ label: 'Pick date' }}
                value={{ startingDate: values.date }}
                onChange={({ startingDate }) => setValues(prev => ({ ...prev, date: startingDate }))}
                numberOfMonths={1}
                singleDate
                disabledDays={
                  date => DateUtils.isPastDay(date)
                    || (bookingEndMoment && DateUtils.isDayAfter(date, bookingEndMoment.toDate()))
                }
              />
            </FormGroup>
            <FormTextArea
              label="Additional notes"
              value={values.notes || ''}
              onChange={(ev, { value }) => setValues(prev => ({ ...prev, notes: value as string }))}
            />
            <div className="field">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Spaces selection</label>
            </div>
            {values.type === schTypeKey(ScheduleType.DROP_OFF) && (
              <SpaceDropOffBlock
                availableSpaces={availableSpaces}
                chosenSpaces={values.spaces}
                handleUpdate={handleDropOffSelect}
                initialRequests={values.spaces}
              />
            )}
            {values.type === schTypeKey(ScheduleType.PICK_UP) && (
              <SpacePickUpBlock
                filledSpaces={filledSpaces}
                spaceTemplates={templatesWithSpaces.map(t => t.spaceTemplate)}
                handleUpdate={handlePickUpUpdate}
                handleDelete={handlePickUpDelete}
                initialRequests={values.spaces}
              />
            )}
          </>
        )}
      </>
      {formVisible && (
        <Button
          className={styles.submit_button}
          color="olive"
          type="submit"
          content="Save"
          loading={saveLoading}
          disabled={formDisabled}
        />
      )}
    </Form>
  );
};

export default ScheduleForm;
