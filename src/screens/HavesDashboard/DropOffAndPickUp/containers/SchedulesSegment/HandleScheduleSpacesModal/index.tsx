import React, { useState, useCallback, useEffect } from 'react';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { connect } from 'react-redux';
import { IAvailableAndScheduledSpaces } from '../../../model/AvailableAndScheduledSpaces';
import { extractAvailableAndScheduledSpaces } from '../../../reducers';
import { fetchAvailableAndScheduledSpaces, updateScheduleWithNewSpaces } from '../../../routines';
import { Button, Dropdown, Input, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { ISpaceWithNotesDto } from '../../../model/SpaceWithNotesDto';
import styles from './styles.module.scss';
import { ISpaceIdsWithScheduleId } from '../../../model/SpaceIdsWithScheduleId';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface IHandleScheduleSpacesModalProps extends IState, IActions {
  scheduleId: string;
  setExpandedScheduleData: IBindingCallback1<IScheduleResponseDto>;
}

interface IState {
  availableAndScheduledSpaces: IAvailableAndScheduledSpaces;
}

interface IActions {
  getAvailableAndScheduledSpaces: IBindingCallback1<string>;
  updateSchedule: IBindingCallback1<ISpaceIdsWithScheduleId>;
}

const HandleScheduleSpacesModal: React.FC<IHandleScheduleSpacesModalProps> = (
  { scheduleId, availableAndScheduledSpaces, setExpandedScheduleData, updateSchedule, getAvailableAndScheduledSpaces }
) => {
  const [indexes, setIndexes] = useState<string[]>([]);
  const [tempSpacesIndexes, setTempSpacesIndexes] = useState<ISpaceWithNotesDto[]>([]);

  useEffect(() => {
    getAvailableAndScheduledSpaces(scheduleId);
  }, [getAvailableAndScheduledSpaces, scheduleId]);

  useEffect(() => {
    if (availableAndScheduledSpaces) {
      let tempIndexes = [];
      tempIndexes = availableAndScheduledSpaces.availableSpaces.map(item => item.spaceInternalIndex);
      tempIndexes = [
        ...tempIndexes,
        ...availableAndScheduledSpaces.scheduledSpaces.map(item => item.spaceInternalIndex)
      ];

      setIndexes(tempIndexes.sort());
      setTempSpacesIndexes(availableAndScheduledSpaces.scheduledSpaces);
    }
  }, [availableAndScheduledSpaces]);

  const setNewSpaceToBeScheduled = (spaceId: string, index: any) => {
    setTempSpacesIndexes(tempSpacesIndexes.map(x => (x.spaceId !== spaceId
      ? x
      : { ...availableAndScheduledSpaces.availableSpaces.find(y => y.spaceInternalIndex === index), note: x.note })));
  };

  const updateScheduleSpaces = (spacesIds: string[]) => {
    updateSchedule({ spacesIds, scheduleId });
    setExpandedScheduleData(undefined);
  };

  const getOptionsWithoutAlreadySelected = useCallback((currentValue: string) => {
    const notIncludeValues = tempSpacesIndexes
      .filter(x => x.spaceInternalIndex !== currentValue)
      .map(x => x.spaceInternalIndex);
    return indexes?.map(item => (!notIncludeValues.includes(item)
      ? { text: item, value: item }
      : undefined)
    ).filter(x => x);
  }, [indexes, tempSpacesIndexes]);

  return (
    <Modal
      open={!!scheduleId}
      onClose={() => setExpandedScheduleData(undefined)}
      size="small"
    >
      <ModalHeader>Map spaces to indexes</ModalHeader>
      {tempSpacesIndexes && (
        <ModalContent>
          {
            tempSpacesIndexes.map((item, index) => (
              <div className={styles.map_div} key={item.spaceId}>
                <span>
                  Space #
                  {index + 1}
                </span>
                <Input
                  icon="tags"
                  iconPosition="left"
                  label={{ tag: true, content: 'User note' }}
                  labelPosition="right"
                  value={item.note}
                  disabled
                />
                <Dropdown
                  defaultValue={item.spaceInternalIndex}
                  selection
                  options={getOptionsWithoutAlreadySelected(item.spaceInternalIndex)}
                  onChange={(event, data) => setNewSpaceToBeScheduled(item.spaceId, data.value)}
                />
              </div>
            ))
          }
        </ModalContent>
      )}
      <ModalActions>
        <Button
          color="green"
          onClick={() => updateScheduleSpaces(tempSpacesIndexes.map(x => x.spaceId))}
          content="Save"
        />
        <Button
          color="red"
          onClick={() => setExpandedScheduleData(undefined)}
          content="Cancel"
        />
      </ModalActions>
    </Modal>
  );
};

const mapStateToProps: (state) => IState = state => ({
  availableAndScheduledSpaces: extractAvailableAndScheduledSpaces(state)
});

const mapDispatchToProps: IActions = {
  getAvailableAndScheduledSpaces: fetchAvailableAndScheduledSpaces,
  updateSchedule: updateScheduleWithNewSpaces
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleScheduleSpacesModal);
