import React, { useEffect, useState } from 'react';
import { IScheduleSpaceNoteDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleSpaceNoteDto';
import styles from './styles.module.scss';
import { Checkbox, Input } from 'semantic-ui-react';
import classNames from 'classnames';
import { IBindingCallback1 } from '@models/Callbacks';
import { IScheduleSpaceRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';

export interface ISpacePickUpRow {
  space: IScheduleSpaceNoteDto;
  handleUpdate: IBindingCallback1<IScheduleSpaceRequest>;
  handleDelete: IBindingCallback1<string>;
  initialRequest?: IScheduleSpaceRequest;
}

const SpacePickUpRow: React.FC<ISpacePickUpRow> = (
  { space, handleUpdate, handleDelete, initialRequest }
) => {
  const [chosen, setChosen] = useState<boolean>(!!initialRequest);
  const [note, setNote] = useState<string>(initialRequest?.note || '');

  useEffect(() => {
    if (chosen) {
      handleUpdate({ spaceId: space.id, note });
    } else {
      handleDelete(space.id);
    }
  }, [space, chosen, note, handleUpdate, handleDelete]);

  return (
    <div className={classNames(styles.container, !chosen && styles.disabled)}>
      <div className={styles.left}>
        <Checkbox checked={chosen} onChange={() => setChosen(prev => !prev)} />
      </div>
      <div className={styles.right}>
        <span className={styles.note} key={space.id}>{space.note}</span>
        <Input
          input={note}
          defaultValue={note}
          onChange={e => setNote(e.target.value)}
          className={classNames(styles.input, !chosen && styles.hidden)}
          placeholder="Note"
        />
      </div>
    </div>
  );
};

export default SpacePickUpRow;
