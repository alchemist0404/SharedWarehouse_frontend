import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import GoogleMapReact from 'google-map-react';
import { env } from '@root/env';
import { Button, Icon, Input, Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { LatLngLiteral } from 'leaflet';
import Geocodio from 'geocodio-library-node';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ILocationWithTitleData } from '@screens/BrowseSpaces/model/QueryData';

export interface ILocationPickerModalProps {
  location?: ILocationWithTitleData;
  setLocation: IBindingCallback1<ILocationWithTitleData>;
  onClose: IBindingAction;
  open: boolean;
}

const geocoder = new Geocodio(env.geocodioApiKey);

const defaultProps = {
  center: {
    lat: 40.24,
    lng: -104.66
  },
  zoom: 4
};

const LocationPickerModal: React.FC<ILocationPickerModalProps> = ({ location, setLocation, onClose, open }) => {
  const [zipLocation, setZipLocation] = useState<LatLngLiteral | undefined>();
  const [zip, setZip] = useState<string>('');
  const [zipTitle, setZipTitle] = useState<string>('');

  const handleClick = useCallback(({ lng, lat }: GoogleMapReact.ClickEventValue) => {
    setZipLocation(undefined);
    setZip('');
    geocoder.reverse(`${lat}, ${lng}`)
      .then(response => setLocation({ title: response.results[0].formatted_address, literal: { lng, lat } }))
      .catch(() => setLocation({ title: '', literal: { lng, lat } }));
  }, [setLocation]);

  const handleSetZip = useCallback(() => {
    setLocation({ literal: zipLocation, title: zipTitle });
    setZip('');
  }, [setLocation, zipLocation, zipTitle]);

  const handleClose = useCallback(() => {
    setZip('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    geocoder.geocode(zip)
      .then(response => {
        setZipLocation(response.results[0].location);
        setZipTitle(response.results[0].formatted_address);
      })
      .catch(() => setZipLocation(undefined));
  }, [zip]);

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      size="small"
      closeIcon
    >
      <ModalHeader>Select location</ModalHeader>
      <ModalContent>
        <div className={styles.zip}>
          <Input
            label="ZIP code"
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
          <Button
            content="Set"
            color="orange"
            disabled={!zipLocation || zipLocation === location?.literal}
            onClick={handleSetZip}
          />
        </div>
        <div>
          {location?.title || '-'}
        </div>
        <div className={styles.wrapper}>
          <GoogleMapReact
            defaultCenter={location?.literal || defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onClick={handleClick}
          >
            {location && (
            <Icon
              name="map marker alternate"
              className={styles.marker}
              lat={location.literal.lat}
              lng={location.literal.lng}
            />
            )}
          </GoogleMapReact>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LocationPickerModal;
