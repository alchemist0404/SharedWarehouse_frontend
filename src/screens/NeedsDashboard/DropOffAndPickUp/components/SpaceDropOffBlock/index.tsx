import React from 'react';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import SpaceItem from '@screens/BuildingDetails/components/SpaceItem';
import styles from './styles.module.scss';
import { IScheduleSpaceRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import { IBindingCallback1 } from '@models/Callbacks';
import { ISpaceToAmount } from '@screens/BuildingDetails/model/BookingRequest';

export interface ISpacePickUpBlock {
  availableSpaces: ISpaceWithAvailability[];
  chosenSpaces: IScheduleSpaceRequest[];
  handleUpdate: IBindingCallback1<ISpaceToAmount>;
  initialRequests: IScheduleSpaceRequest[];
}

const SpaceDropOffBlock: React.FC<ISpacePickUpBlock> = (
  { availableSpaces, chosenSpaces, handleUpdate, initialRequests }
) => (
  <div className={styles.container}>
    {availableSpaces.map(t => (
      <SpaceItem
        key={t.id}
        space={t}
        amountSelected={
          t.spaceIdsAvailable
            .filter(id => chosenSpaces.find(sp => sp.spaceId === id))
            .length
        }
        notesRequired
        onClick={handleUpdate}
        initialAmount={initialRequests.length}
        initialNotes={initialRequests.map(s => s.note)}
      />
    ))}
  </div>
);

export default SpaceDropOffBlock;
