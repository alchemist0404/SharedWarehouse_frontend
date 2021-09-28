import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { ISpaceDto } from '@screens/SpaceEditor/models/ISpaceDto';
import SpaceListElement from '@screens/SpaceEditor/components/SpaceListElement';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';

interface ISpacesListProps {
  spaces: ISpaceDto[];
  saveSpace: IBindingCallback1<ISpaceEdit>;
  chooseSpace: IBindingCallback1<Partial<ISpaceDto>>;
  hideSpace: IBindingAction;
  chosenSpace?: Partial<ISpaceDto>;
  saveSpaceLoading: boolean;
  spacesLoading: boolean;
}

const SpacesList: React.FC<ISpacesListProps> = (
  { spaces, saveSpace, chooseSpace, hideSpace, chosenSpace, saveSpaceLoading, spacesLoading }
) => {
  const definedSpaces = spaces || [];
  const spacesWithNew = [{}, ...definedSpaces] as Partial<ISpaceDto>[];

  const handleAdd = useCallback(() => {
    chooseSpace({});
  }, [chooseSpace]);

  return (
    <div className={styles.container}>
      {spacesLoading
        ? <Loader active />
        : (
          <>
            <div className={styles.buttonWrapper}>
              <Button
                color="orange"
                content="Add New"
                onClick={handleAdd}
              />
            </div>
            {spacesWithNew.map((space, i) => (
              <div key={space?.id}>
                {i !== 0 && <Divider fitted className={styles.divider} />}
                <SpaceListElement
                  space={space}
                  isEditing={chosenSpace && space.id === chosenSpace?.id}
                  saveSpace={saveSpace}
                  chooseSpace={chooseSpace}
                  hideSpace={hideSpace}
                  saveSpaceLoading={saveSpaceLoading}
                />
              </div>
            ))}
          </>
        )}
    </div>
  );
};

export default SpacesList;
