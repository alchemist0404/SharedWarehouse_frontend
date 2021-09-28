import React from 'react';
import styles from './styles.module.scss';
import { ISpaceDto } from '@screens/SpaceEditor/models/ISpaceDto';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { Icon } from 'semantic-ui-react';
import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';
import SpaceListEdit from '@screens/SpaceEditor/components/SpaceListEdit';

interface ISpacesListProps {
  space: Partial<ISpaceDto>;
  isEditing: boolean;
  saveSpace: IBindingCallback1<ISpaceEdit>;
  chooseSpace: IBindingCallback1<Partial<ISpaceDto>>;
  hideSpace: IBindingAction;
  saveSpaceLoading: boolean;
}

const SpaceListElement: React.FC<ISpacesListProps> = (
  { space, isEditing, chooseSpace, hideSpace, saveSpace, saveSpaceLoading }
) => {
  if (!space?.id && !isEditing) {
    return <div />;
  }

  return (
    <div>
      {isEditing
        ? (
          <SpaceListEdit
            space={space}
            saveSpaceLoading={saveSpaceLoading}
            saveSpace={saveSpace}
            hideSpace={hideSpace}
          />
        )
        : (
          <div className={styles.container} onClick={() => chooseSpace(space)}>
            <div className={styles.index}>
              {space.index}
            </div>
            {space.blockedByOwner && (
              <div className={styles.blocked}>
                <Icon name="times" />
                Blocked
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default SpaceListElement;
