import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import {
  Button,
  Card,
  CardContent,
  Input,
  LabelProps,
  SemanticShorthandItem
} from 'semantic-ui-react';
import { times } from 'lodash';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import CounterInput from '@components/CouterInput';
import { ISpaceToAmount } from '../../model/BookingRequest';
import SpaceItemHeader from '@screens/BuildingDetails/components/SpaceItem/SpaceItemHeader';

export interface ISpaceItemProps {
  space: ISpaceWithAvailability;
  amountSelected: number;
  notesRequired?: boolean;
  onClick: IBindingCallback1<ISpaceToAmount>;
  initialAmount?: number;
  initialNotes?: string[];
}

const SpaceItem: React.FC<ISpaceItemProps> = (
  { space, amountSelected, notesRequired, onClick, initialAmount, initialNotes }
) => {
  const [tempAmountSelected, setAmountSelected] = useState<number>(initialAmount || 0);
  const [spaceNotes, setSpaceNotes] = useState<string[]>(initialNotes || []);

  const handleSpacesNotes = (value: string, index: number) => {
    if (value && (!spaceNotes || !spaceNotes[index])) {
      setSpaceNotes([...spaceNotes, value]);
    } else {
      setSpaceNotes(spaceNotes.map((v, i) => (i === index ? value : v)).filter(x => x));
    }
  };

  const changeAmountAndReflectNotes = (amount: number) => {
    setAmountSelected(amount);

    // clear last note if decrease amount of spaces clicked
    if (notesRequired && tempAmountSelected > amount) {
      handleSpacesNotes(undefined, amount);
    }
  };

  const amountLessOrEqualZero = useMemo(() => tempAmountSelected <= 0, [tempAmountSelected]);
  const amountNotEqualNumberOfNotes = useMemo(
    () => tempAmountSelected !== spaceNotes.length, [tempAmountSelected, spaceNotes]
  );

  const chooseLabel = useCallback((): SemanticShorthandItem<LabelProps> => {
    if (notesRequired && amountNotEqualNumberOfNotes && !amountLessOrEqualZero) {
      return { className: styles.custom_label, content: 'Fill all notes' };
    }

    if (amountLessOrEqualZero) {
      return { className: styles.custom_label, content: 'No spaces chosen' };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempAmountSelected, spaceNotes, notesRequired]);

  return (
    <Card className={styles.card} fluid color={amountSelected ? 'green' : undefined}>
      <CardContent>
        <SpaceItemHeader space={space} />
      </CardContent>
      <CardContent extra className={styles.selection}>
        <CounterInput
          max={space.amountAvailable}
          min={0}
          onChange={changeAmountAndReflectNotes}
          value={tempAmountSelected}
        />
        <div>
          <Button
            type="button"
            className={styles.selection_button}
            basic={!amountSelected}
            onClick={() => onClick({ amount: tempAmountSelected, spaceTemplateId: space.id, spacesNotes: spaceNotes })}
            content={`Select${amountSelected !== 0 ? ` ${amountSelected}` : ''}`}
            color="olive"
            disabled={(notesRequired && amountNotEqualNumberOfNotes) || amountLessOrEqualZero}
            label={chooseLabel()}
          />
          {amountSelected !== 0 && (
            <Button
              type="button"
              className={styles.clear_selection_button}
              onClick={() => onClick({ amount: 0, spaceTemplateId: space.id, spacesNotes: spaceNotes })}
              icon="remove"
              size="mini"
              compact
              circular
              color="olive"
            />
          )}
        </div>
      </CardContent>
      {notesRequired && tempAmountSelected > 0
      && (
        <CardContent extra>
          <div className={styles.notes}>
            {
              times(tempAmountSelected).map(index => (
                <div key={index}>
                  <p>
                    Space #
                    {index + 1}
                  </p>
                  <Input
                    defaultValue={spaceNotes[index]}
                    className={styles.custom_input}
                    onChange={(event, data) => handleSpacesNotes(data.value, index)}
                    placeholder="Describe your stuff..."
                  />
                </div>
              ))
            }
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SpaceItem;
