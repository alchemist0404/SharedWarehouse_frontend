import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import { ILocationWithTitleData } from '@screens/BrowseSpaces/model/QueryData';
import LocationPickerModal from '@components/LocationPicker/LocationPickerModal';

export interface ILocationPickerProps {
  location?: ILocationWithTitleData;
  setLocation: IBindingCallback1<ILocationWithTitleData>;
}

const LocationPicker: React.FC<ILocationPickerProps> = ({ location, setLocation }) => {
  const [modalShown, setModalShown] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {location
        ? <div className={styles.selected}>{location.title}</div>
        : <div className={styles.notSelected}>Location not selected</div>}
      <div className={styles.buttonWrapper}>
        <Button
          content={location ? 'Change' : 'Select'}
          onClick={() => setModalShown(true)}
          className={styles.button}
        />
      </div>
      <LocationPickerModal
        setLocation={setLocation}
        location={location}
        onClose={() => setModalShown(false)}
        open={modalShown}
      />
    </div>
  );
};

export default LocationPicker;
