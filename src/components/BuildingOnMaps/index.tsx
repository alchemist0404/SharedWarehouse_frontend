import React from 'react';
import { Modal, ModalContent } from 'semantic-ui-react';
import Map from '@screens/BuildingDetails/components/Map';
import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import styles from './styles.module.scss';

export interface IBuildingOnMapsProps {
  showMap: boolean;
  setShowMap: (val: boolean) => void;
  building?: IBuildingForDisplaying;
}

const BuildingOnMaps: React.FC<IBuildingOnMapsProps> = ({ showMap, setShowMap, building }) => (
  <Modal open={showMap} className={styles.custom_modal} onClose={() => setShowMap(false)} closeIcon basic>
    <ModalContent>
      <p>{`Address: ${building?.location?.address || 'Unknown'}`}</p>
      <Map
        lat={building?.location?.lat}
        lon={building?.location?.lon}
        currentBuildingName={building?.buildingName}
      />
    </ModalContent>
  </Modal>
);

export default BuildingOnMaps;
