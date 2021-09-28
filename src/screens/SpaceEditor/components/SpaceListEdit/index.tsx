import React, { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { ISpaceDto } from '@screens/SpaceEditor/models/ISpaceDto';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { Button, Checkbox, Icon, Input } from 'semantic-ui-react';
import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';

interface ISpaceListEditProps {
  space: Partial<ISpaceDto>;
  saveSpace: IBindingCallback1<ISpaceEdit>;
  hideSpace: IBindingAction;
  saveSpaceLoading: boolean;
}

const SpaceListEdit: React.FC<ISpaceListEditProps> = (
  { space, hideSpace, saveSpace, saveSpaceLoading }
) => {
  const [index, setIndex] = useState<string>(space.index || '');
  const [blocked, setBlocked] = useState<boolean>(space.blockedByOwner || false);

  const handleSave = useCallback(() => {
    saveSpace({ index, blockedByOwner: blocked });
  }, [saveSpace, blocked, index]);

  const handleCancel = useCallback(() => {
    hideSpace();
  }, [hideSpace]);

  const isValid = !!index.trim();

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <Input value={index} onChange={event => setIndex(event.target.value)} />
          <Checkbox
            className={styles.checkbox}
            checked={blocked}
            onChange={() => setBlocked(!blocked)}
            label="Blocked"
          />
        </div>
        <div className={styles.left}>
          <Button content="Cancel" onClick={handleCancel} />
          <Button
            color="green"
            content="Save"
            onClick={handleSave}
            loading={saveSpaceLoading}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceListEdit;
